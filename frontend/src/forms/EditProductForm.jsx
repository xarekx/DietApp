import { useState } from "react"
import TextField from '@mui/material/TextField';

export function EditProductForm({handleUpdateProduct, product, form, handleChange, sendModalStatusToParent}) {

    const [ closeModalStatus] = useState(false);

    function closeModal() {
        sendModalStatusToParent(closeModalStatus);
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
                                Edit Product
                                </h3>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                                <form onSubmit={(event)=> handleUpdateProduct(event, product.id)} className="flex flex-col w-[300px]">
                                    <TextField id="name" label="Name" defaultValue={product.name} onChange={handleChange} size="small" margin="normal"/>
                                    <TextField id="protein" label="Protein" defaultValue={product.protein} onChange={handleChange} size="small" margin="normal" type="number"/>
                                    <TextField id="carbohydrates" label="Carbohydrates" defaultValue={product.carbohydrates} onChange={handleChange} size="small" margin="normal" type="number"/>
                                    <TextField id="fat" label="Fat" defaultValue={product.fat} onChange={handleChange} size="small" margin="normal" type="number"/>
                                    <TextField id="calories" label="Calories" defaultValue={product.calories} onChange={handleChange} size="small" margin="normal" type="number"/>
                                    <div className="flex items-center justify-end p-6 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 h-[40px] text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button" onClick={closeModal}>
                                            Close
                                        </button>
                                        <button
                                            className="bg-emerald-500 text-white h-[40px] active:bg-emerald-600 font-bold uppercase text-sm px-6 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
        )
            
}