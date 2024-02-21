import { useState } from "react"
import { HiDotsHorizontal } from "react-icons/hi";


export function DropdownProductsForm({product, handleDeleteProduct, handleUpdateProduct, handleChange, form}) {

    const [toggleDroopdown, setToggleDroopdown] = useState(false);
    const [toggleDelete, setToggleDelete] = useState(false);
    const [toggleEdit, setToggleEdit] = useState(false);

    const handleClick = () => {
        setToggleDelete(true);
        setToggleDroopdown(false);
    }

  return (
    <>
        <td className="p-2 text-xl">
            <HiDotsHorizontal className="hover:text-slate-400 ms-auto me-auto hover:cursor-pointer" onClick={()=> setToggleDroopdown(!toggleDroopdown)}/>
            {toggleDroopdown ? 
                (<>
                    <div className="absolute text-sm text-black border rounded-md shadow-md bg-white ring-inset pe-8 p-2 ps-4 right-[12vw]">
                        <div className="block hover:cursor-pointer" onClick={()=> setToggleEdit(true)}>Edit</div>
                        <div className="block hover:cursor-pointer text-red-500" onClick={()=> handleClick()}>Delete</div>
                    </div>
                </> ): null
            }
            {toggleEdit ? (
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
                                    <form onSubmit={()=> handleUpdateProduct(product.id)} className="flex flex-col">
                                        <label htmlFor="name">Name</label>
                                        <input id="name" type="text" defaultValue={product.name} value={form.name} onChange={handleChange} className="bg-slate-100"></input>
                                        <label htmlFor="protein">Protein</label>
                                        <input id="protein" type="number" defaultValue={product.protein} value={form.protein} onChange={handleChange} className="bg-slate-100"></input>
                                        <label htmlFor="carbohydrates">Carbohydrates</label>
                                        <input id="carbohydrates" type="number" defaultValue={product.carbohydrates} value={form.carbohydrates} onChange={handleChange} className="bg-slate-100"></input>
                                        <label htmlFor="fat">Fat</label>
                                        <input id="fat" type="number" defaultValue={product.fat} value={form.fat} onChange={handleChange} className="bg-slate-100"></input>
                                        <label htmlFor="calories">Calories</label>
                                        <input id="calories" type="number" defaultValue={product.calories} value={form.calories} onChange={handleChange} className="bg-slate-100"></input>
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setToggleEdit(false)}>
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
                </>): null
            }
            {toggleDelete ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-sm">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex p-5 border-b border-solid border-blueGray-200 rounded-t w-full justify-center">
                                    <h3 className="text-3xl font-semibold">
                                    Delete Product
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <span className="text-base items-center">Are you sure to delete {product.name} ?</span>
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-emerald-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setToggleDelete(false)}>
                                        Close
                                    </button>
                                    <button
                                        className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        onClick={() => handleDeleteProduct(product.id)}>
                                        Delete
                                    </button>
                                    </div>
                                </div>
                                {/*footer*/}
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>): null
            }
        </td>
    </>
  );
}