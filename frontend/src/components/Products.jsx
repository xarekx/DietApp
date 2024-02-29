import { useState, useEffect } from "react";
import { AddProductForm} from "../forms/AddProductForm";
import ReactPaginate from 'react-paginate';
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { DeleteProductForm } from "../forms/DeleteProductForm";
import { EditProductForm } from "../forms/EditProductForm";

export function ProductsData() {

    const [itemOffset, setItemOffset] = useState(0);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState(useState({
        name: "",
        protein: 0,
        carbohydrates: 0,
        fat: 0,
        calories: 0
    }))

    // get products from products rest api
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/products/")
            .then((res) =>{
                return res.json();
        }).then((data) => {
            setProducts(data);
        })
    },[]);

    // variables to pagination
    const itemsPerPage = 15;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    // Create pages based on items per page
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        setItemOffset(newOffset);
        setToggleDropdown(false);
    };
    
    // delete request
    const handleDeleteProduct = id => {
        const requestOptions = {
          method: 'DELETE',
          }
        fetch('http://127.0.0.1:8000/api/products/'+id, requestOptions)
            .then((response) => {
                if(!response.ok) {
                    throw new Error('Something went wrong')
                }
                setProducts(products.filter((item) => item.id !== id))
            }) 
    }

    // update request
    const handleUpdateProduct = id => {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: form.name,
                protein: form.protein,
                carbohydrates: form.carbohydrates,
                fat: form.fat,
                calories: form.calories  })
          }
        fetch('http://127.0.0.1:8000/api/products/'+id+"/", requestOptions)
            .then((response) => {
                if(!response.ok) {
                    throw new Error('Something went wrong')
                }
                setProducts(products.filter((item) => item.id !== id))
            }) 
    }

    // post data to backend with submit
    const handleAddProduct = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: form.name,
                protein: form.protein,
                carbohydrates: form.carbohydrates,
                fat: form.fat,
                calories: form.calories  })
        };
        fetch('http://127.0.0.1:8000/api/products/', requestOptions)
            .then(response => response.json())
            // .then(form => this.setState({ formId: form.id }));
    }
    
    // get the change from the input
    const handleChange = (event) => {
        setForm({
            ...form,
        [event.target.id]: event.target.value,
      })
    };

    // prevent to display two menu at the same time
    const clickHandler = (index) => {
        setToggleDropdown((prev) => {
            return prev === index ? null : index;
        });
        console.log('clicked', index);
    };

    return (
        <>
        <div className="flex flex-col ms-auto me-auto w-2/3 mt-10 rounded-t shadow-xl bg-white h-fit ">
            {/* card header */}
            <div className="flex justify-between p-4">
                <span className="text-xl font-bold">Products</span>
                <div className="flex text-center">
                    <AddProductForm handleAddProduct={handleAddProduct} form={form} handleChange={handleChange}/>
                </div>
            </div>
            <table className="table-auto">
                <thead>
                    <tr className="text-sm font-bold border-b-[1px] border-slate-100 bg-slate-200">
                        {/* table headers */}
                        <th className="text-start ps-4 w-1/2">Name</th>
                        <th className="text-start p-2">Protein</th>
                        <th className="text-start p-2">Carbohydrates</th>
                        <th className="text-start p-2">Fat</th>
                        <th className="text-start p-2">Calories</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>  
                    {currentItems.map((product, index) => {
                        return (
                            <>
                            {index%2===0 ? 
                                <tr className="text-start hover:text-slate-600 border-b-[1px] border-slate-100" key={index}>
                                    {/* table content */}                     
                                    <td className="ps-4">{product.name}</td>
                                    <td className="p-2">{product.protein}</td>
                                    <td className="p-2">{product.carbohydrates}</td>
                                    <td className="p-2">{product.fat}</td>
                                    <td className="p-2">{product.calories}</td>
                                    {/* dropdown dots */}
                                    <td className="text-xl">
                                        <HiDotsHorizontal className="h-[2rem] w-[1.5em] me-auto ms-auto hover:shadow-md hover:shadow-slate-200 hover:rounded-md hover:cursor-pointer" onClick={()=> clickHandler(index)}/>
                                        <div className={toggleDropdown === index ? '' : 'hidden'} >
                                            <div className="absolute text-sm text-black border rounded-md shadow-md bg-white ring-inset pe-8 p-2 ps-4 right-[11vw]" >
                                                <EditProductForm product={product} handleUpdateProduct={handleUpdateProduct} handleChange={handleChange} form={form}/>
                                                <DeleteProductForm product={product} handleDeleteProduct={handleDeleteProduct}/>
                                            </div>
                                        </div>
                                    </td> 
                                </tr>
                                :
                                <tr className="text-start hover:text-slate-600 border-b-[1px] border-slate-100 bg-slate-50" key={index}>
                                    {/* table content */}
                                    <td className="ps-4">{product.name}</td>
                                    <td className="p-2">{product.protein}</td>
                                    <td className="p-2">{product.carbohydrates}</td>
                                    <td className="p-2">{product.fat}</td>
                                    <td className="p-2">{product.calories}</td>
                                    {/* dropdown dots */}
                                    <td className="text-xl">
                                        <HiDotsHorizontal className="h-[2rem] w-[1.5em] me-auto ms-auto hover:shadow-md hover:shadow-slate-200 hover:rounded-md hover:cursor-pointer " onClick={()=> clickHandler(index)}/>
                                        <div className={toggleDropdown === index ? '' : 'hidden'}>
                                            <div className="absolute text-sm text-black border rounded-md shadow-md bg-white ring-inset pe-8 p-2 ps-4 right-[11vw]" >
                                                <EditProductForm product={product} handleUpdateProduct={handleUpdateProduct} handleChange={handleChange} form={form}/>
                                                <DeleteProductForm product={product} handleDeleteProduct={handleDeleteProduct}/>
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
            <ReactPaginate
                breakLabel="..."
                nextLabel={<MdNavigateNext className="border w-[43px] h-[29px] text-2xl hover:shadow-md rounded-md"/>}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                pageClassName="border ps-4 pe-4 rounded-md hover:shadow-md"
                previousLabel={<MdNavigateBefore className="border w-[43px] h-[29px] text-2xl hover:shadow-md rounded-md"/>}
                renderOnZeroPageCount={null}
                className="flex justify-center text-lg items-center gap-2 mb-2 mt-2"
            />
        </div>
        </>
    )
}

