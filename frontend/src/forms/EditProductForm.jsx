import { useState } from "react"

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
                                <form onSubmit={(event)=> handleUpdateProduct(event, product.id)} className="flex flex-col">
                                    <label htmlFor="name">Name</label>
                                    <input id="name" type="text" defaultValue={product.name} onChange={handleChange} className="bg-slate-100"></input>
                                    <label htmlFor="protein">Protein</label>
                                    <input id="protein" type="number" defaultValue={product.protein} onChange={handleChange} className="bg-slate-100"></input>
                                    <label htmlFor="carbohydrates">Carbohydrates</label>
                                    <input id="carbohydrates" type="number" defaultValue={product.carbohydrates} onChange={handleChange} className="bg-slate-100"></input>
                                    <label htmlFor="fat">Fat</label>
                                    <input id="fat" type="number" defaultValue={product.fat} onChange={handleChange} className="bg-slate-100"></input>
                                    <label htmlFor="calories">Calories</label>
                                    <input id="calories" type="number" defaultValue={product.calories} onChange={handleChange} className="bg-slate-100"></input>
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button" onClick={closeModal}>
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
        )
            
}