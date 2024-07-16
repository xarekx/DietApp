import { useEffect, useState } from "react"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useFetch } from "../hooks/useFetch";


export function AddProductForm({form, handleAddProduct, handleChange, sendModalStatusToParent}) {

  const [ closeModalStatus] = useState(false);

  function closeModal() {
      sendModalStatusToParent(closeModalStatus);
  }

  const [productCategory, setProductCategory] = useState([]);
  const [selectedProductCategory, setSelectedProductCategory ] = useState("");

  const fetchCategories = useFetch("http://127.0.0.1:8000/api/product_category/", "GET");

    useEffect(()=>{
        fetchCategories()
        .then(res => res.json())
        .then(data => setProductCategory(data))
        .catch(error => console.error("Error fetching product category", error))
        // eslint-disable-next-line
    },[])
  
  
  const handleChangeCategory = (event) => {
    const selectedCategory = event.target.value;
    setSelectedProductCategory(selectedCategory);
    console.log(selectedCategory);
    handleChange({ target: { id: "category", value: selectedCategory } });
  }

  return (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex p-5 border-b border-solid border-blueGray-200 rounded-t w-full justify-center">
                  <h3 className="text-3xl font-semibold">
                    Add Product
                  </h3>
                </div>
                {/*body*/}
                <div className="relative pb-10 ps-10 pe-10 pt-4 flex-auto">
                  <form onSubmit={(event)=> handleAddProduct(event)} className="flex flex-col gap-1">
                    <TextField id="name" label="Name" variant="standard" value={form.name} onChange={handleChange} />
                    <TextField id="protein" label="Protein" variant="standard" value={form.protein} onChange={handleChange} type="number"/>
                    <TextField id="carbohydrates" label="Carbohydrates" variant="standard" value={form.carbohydrates} onChange={handleChange} type="number" />
                    <TextField id="fat" label="Fat" variant="standard" value={form.fat} onChange={handleChange} type="number"/>
                    <TextField id="calories" label="Calories" variant="standard" value={form.calories} onChange={handleChange} type="number" />
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="category">Category</InputLabel>
                      <Select id="category" label="category" value={selectedProductCategory} onChange={handleChangeCategory}>
                        {productCategory.map((productCategory, index) => (
                          <MenuItem value={productCategory.id} key={index}>
                            {productCategory.name}
                          </MenuItem>))}
                      </Select>
                    </FormControl>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={closeModal}>
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </> 
  );
}