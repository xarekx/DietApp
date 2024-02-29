import { useState } from "react"
import { FaPlus } from "react-icons/fa";


export function AddProductForm({form, handleAddProduct, handleChange}) {

    // hook to display add product modal
    const [toggle, setToggle] = useState(false);
  
  return (
    <>
      <button className="flex items-center gap-2 rounded-md ps-2 pe-2 pt-1 pb-1 border border-slate-400 shadow-sm hover:pointer hover:shadow-md" 
      onClick={()=> setToggle(true)}>
        <FaPlus className="w-3 h-3 text-slate-500"/>New
      </button>
      {toggle ? ( 
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
                <div className="relative p-6 flex-auto">
                  <form onSubmit={handleAddProduct} className="flex flex-col">
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" value={form.name} onChange={handleChange} className="bg-slate-100"></input>
                    <label htmlFor="protein">Protein</label>
                    <input id="protein" type="number" value={form.protein} onChange={handleChange} className="bg-slate-100"></input>
                    <label htmlFor="carbohydrates">Carbohydrates</label>
                    <input id="carbohydrates" type="number" value={form.carbohydrates} onChange={handleChange} className="bg-slate-100"></input>
                    <label htmlFor="fat">Fat</label>
                    <input id="fat" type="number" value={form.fat} onChange={handleChange} className="bg-slate-100"></input>
                    <label htmlFor="calories">Calories</label>
                    <input id="calories" type="number" value={form.calories} onChange={handleChange} className="bg-slate-100"></input>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setToggle(false)}>
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
        ): null}
    </>
  );
}