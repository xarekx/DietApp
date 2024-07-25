import { useState, useEffect } from "react";
import { AddProductForm} from "../../forms/AddProductForm";
import ReactPaginate from 'react-paginate';
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { DeleteProductForm } from "../../forms/DeleteProductForm";
import { EditProductForm } from "../../forms/EditProductForm";
import { useFetch } from "../../hooks/useFetch";
import { getUpdatedFields } from "../../utils/getUpdatedFields";
import { Button} from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CustomTextField from "../../utils/generic/CustomTextField";
import CustomFilterButton from "../../utils/generic/CustomFilterButton";

export function ProductsData() {

    const [itemOffset, setItemOffset] = useState(0);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct ] = useState([]);
    const [toggleModal, setToggleModal] = useState(false);
    const [selectedForm, setSelectedForm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([])


    const [form, setForm] = useState(useState({
        name: "",
        protein: 0,
        carbohydrates: 0,
        fat: 0,
        calories: 0,
        category: 0
    }))

    const updatedFields = getUpdatedFields(form, selectedProduct);

    const fetchProductsData = useFetch("http://127.0.0.1:8000/api/products/", "GET");
    const fetchDeleteProduct = useFetch(`http://127.0.0.1:8000/api/products/${selectedProduct.id}`, "DELETE");
    const fetchUpdateProduct = useFetch(`http://127.0.0.1:8000/api/products/${selectedProduct.id}/`, "PATCH", updatedFields);
    const fetchAddProduct = useFetch(`http://127.0.0.1:8000/api/products/`, "POST", 
        {name: form.name, protein: form.protein, carbohydrates: form.carbohydrates, fat: form.fat, calories: form.calories, category: form.category});
    
    useEffect(()=> {
        fetchProductsData()
        .then(res =>res.json())
        .then(data => {
            setProducts(data)
            setFilteredProducts(data)
            })
        .catch(error => console.error('Error fetching products: ', error));
        // eslint-disable-next-line
    },[])

    // variables to pagination
    const itemsPerPage = 15;
    const currentItems = filteredProducts.slice(itemOffset, itemOffset + itemsPerPage);
    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

    // Create pages based on items per page
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        setItemOffset(newOffset);
        setToggleDropdown(false);
    };
    
    // delete request
    const handleDeleteProduct = (id) => {     
        fetchDeleteProduct()
            .then((res) => {
                if(!res.ok) {
                    throw new Error('Something went wrong')
                }
                setProducts(products.filter((item) => item.id !== id))
            })
            .catch(error => console.error('Error deleting product: ', error));
    };

    
    // update request - updating only changed values
    const handleUpdateProduct = (event, id) => {
        event.preventDefault();
        fetchUpdateProduct()
            .then((res) => {
                if(!res.ok) {
                    throw new Error('Something went wrong')
                }
                const updatedProducts = products.map((item) => {
                    if (item.id === id) {
                        return {
                            ...item,
                            ...updatedFields
                        };
                    }
                    return item;
                });

               setProducts(updatedProducts);
               setToggleModal(false);
            })
            .catch(error => console.error('Error updating product: ', error))
    };

    // post data to backend with submit
    const handleAddProduct = (event) => {
        event.preventDefault();

        fetchAddProduct()
        .then(res => {
            if(!res.ok) {
                console.log(res.json());
                throw new Error('Something went wrong');
            } else {
                res.json()
                fetchProductsData()
                    .then(res =>res.json())
                    .then(data => setProducts(data))
                    .catch(error => console.error('Error fetching products: ', error));
                handleCloseModal(false);
            }
        })
        .catch(error => {
            console.error('Error adding product:', error);
        });
    };
    
    // get the change from the input
    const handleChange = (event) => {
        setForm({
            ...form,
        [event.target.id]: event.target.value,
      });
    };

    // prevent to display two menu at the same time
    const clickHandler = (index) => {
        setToggleDropdown((prev) => {
            return prev === index ? null : index;
        });
    };
    
    // setSelectedProducts to be able load data in EditProductForm Modal
    
    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
        setToggleModal(true); 
        setToggleDropdown(false);
    };

    // get the modal state from child ( EditProductForm )

    const handleCloseModal = (modalStatus) => {
        setToggleModal(modalStatus);
      }

      const handleFilter = (event) => {
        const query = event.target.value.toLowerCase();
        if (query === '' ){
            setFilteredProducts(products)
        } else {
            setFilteredProducts(products.filter(d => (d.name.toLowerCase().startsWith((event.target.value).toLowerCase()))));
        }
        
    }

    return (
        <>
        <div className="flex flex-col w-full">
            <div className="flex flex-row border-b-[1px] border-slate-400 md:w-2/3 ms-auto me-auto text-[#6E6893] font-bold justify-between mt-4 pb-2">
                <span className="text-sm md:text-xl">Products</span>
                <span className="md:text-xl">Total products: {products.length}</span>
            </div>
        <div className="flex flex-col md:ms-auto md:me-auto w-full md:w-2/3 mt-10 rounded-t shadow-sm md:shadow-xl bg-white h-fit text-xs md:text-sm m-2">
            
            {/* Content header */}
            <div className="flex justify-between p-3 md:p-4 gap-4">
                <div className="flex w-1/2 gap-4">
                    <CustomFilterButton />
                    <CustomTextField onChange={handleFilter} />
                </div>
                <div className="flex text-center">
                    <Button variant="contained" color="success" startIcon={<AddOutlinedIcon />}
                    onClick={(event) => {setSelectedForm(event.currentTarget.textContent); setToggleModal(true); setToggleDropdown(false);}}>New
                    </Button>
                </div>
            </div>
            <table className="table-auto">
                <thead>
                    <tr className="text-sm font-semibold  border-b-[1px] border-t-[1px] border-slate-300 bg-[#F4F2FF] text-[#6E6893]">
                        {/* table headers */}
                        <th className="text-start ps-4 max-w-1/3 md:w-1/2">Name</th>
                        <th className="text-start p-2 ">Protein</th>
                        <th className="text-start p-2 ">Carbs</th>
                        <th className="text-start p-2 ">Fat</th>
                        <th className="text-start p-2 ">Calories</th>
                        <th className="text-start p-2 ">Category</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>  
                    {currentItems.map((product, index) => {
                        return (
                            <>
                            {index%2===0 ? 
                                <tr className="text-start hover:text-slate-600 border-b-[1px] border-slate-300 hover:bg-[#F4F2FF] font-medium" key={index}>
                                    {/* table content */}                     
                                    <td className="ps-4 pt-1">{product.name}</td>
                                    <td className="p-2">{product.protein}</td>
                                    <td className="p-2">{product.carbohydrates}</td>
                                    <td className="p-2">{product.fat}</td>
                                    <td className="p-2">{product.calories}</td>
                                    <td className="p-2">{product.category_name}</td>
                                    {/* dropdown dots */}
                                    <td className="text-xl">
                                        <HiDotsHorizontal className="md:h-[2rem] md:w-[1.5em] md:me-auto md:ms-auto hover:shadow-md hover:shadow-slate-200 hover:rounded-md hover:cursor-pointer me-2" onClick={()=> clickHandler(index)}/>
                                        <div className={toggleDropdown === index ? '' : 'hidden'} >
                                            <div className="absolute text-xs md:text-sm text-black border rounded-md shadow-md bg-white ring-inset pe-4 p-1 ps-2 md:pe-8 md:p-2 md:ps-4 right-[7vw] md:right-[12vw] lg:right-[14vw] xl:right-[15vw]" >
                                                <div className="block hover:cursor-pointer" onClick={(event) => {handleSelectProduct(product); setSelectedForm(event.currentTarget.textContent);}}>Edit</div>
                                                <div className="block hover:cursor-pointer text-red-500" onClick={(event) => {handleSelectProduct(product); setSelectedForm(event.currentTarget.textContent);}}>Delete</div>
                                            </div>
                                        </div>
                                    </td> 
                                </tr>
                                :
                                <tr className="text-start hover:text-slate-600 border-b-[1px] border-slate-300 bg-slate-50 hover:bg-[#F4F2FF] font-medium" key={index}>
                                    {/* table content */}
                                    <td className="ps-4">{product.name}</td>
                                    <td className="p-2">{product.protein}</td>
                                    <td className="p-2">{product.carbohydrates}</td>
                                    <td className="p-2">{product.fat}</td>
                                    <td className="p-2">{product.calories}</td>
                                    <td className="p-2">{product.category_name}</td>
                                    {/* dropdown dots */}
                                    <td className="text-xl">
                                        <HiDotsHorizontal className="md:h-[2rem] md:w-[1.5em] md:me-auto md:ms-auto hover:shadow-md hover:shadow-slate-200 hover:rounded-md hover:cursor-pointer me-2" onClick={()=> clickHandler(index)}/>
                                        <div className={toggleDropdown === index ? '' : 'hidden'}>
                                            <div className="absolute text-xs md:text-sm text-black border rounded-md shadow-md bg-white ring-inset pe-4 p-1 ps-2 md:pe-8 md:p-2 md:ps-4 md:right-[12vw] lg:right-[14vw] xl:right-[15vw]" >
                                                <div className="block hover:cursor-pointer" onClick={(event) => {handleSelectProduct(product); setSelectedForm(event.currentTarget.textContent);}}>Edit</div>
                                                <div className="block hover:cursor-pointer text-red-500" onClick={(event) => {handleSelectProduct(product); setSelectedForm(event.currentTarget.textContent);}}>Delete</div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                } 
                            </>
                        );
                    })}
                </tbody>
            </table>

            { toggleModal && selectedForm === 'Edit' ? (
                <EditProductForm product={selectedProduct} handleUpdateProduct={handleUpdateProduct} handleChange={handleChange} form={form} sendModalStatusToParent={handleCloseModal}/>
            )
            : toggleModal && selectedForm === 'Delete' ? (
                <DeleteProductForm product={selectedProduct} handleDeleteProduct={handleDeleteProduct} sendModalStatusToParent={handleCloseModal}/>
            )
            :  toggleModal && selectedForm === 'New' ? (
                <AddProductForm handleAddProduct={handleAddProduct} form={form} handleChange={handleChange} sendModalStatusToParent={handleCloseModal}/>
            ) : false
            }
            
            <ReactPaginate
                breakLabel="..."
                nextLabel={<MdNavigateNext className="border w-[42px] h-[22px] md:w-[43px] md:h-[29px] text-sm md:text-2xl hover:shadow-md rounded-md"/>}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                pageClassName="border ps-4 pe-4 rounded-md hover:shadow-md"
                previousLabel={<MdNavigateBefore className="border w-[42px] h-[22px] md:w-[43px] md:h-[29px] text-sm md:text-2xl hover:shadow-md rounded-md"/>}
                renderOnZeroPageCount={null}
                activeClassName="bg-[#ddd9f1]"
                className="flex justify-center text-sm md:text-lg items-center gap-2 pt-2 pb-2 bg-[#F4F2FF] border-t-[1px]"
            />
        </div>
        </div>
        </>
    )
}

