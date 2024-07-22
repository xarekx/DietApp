import { useState } from "react"

export function DeleteProductForm({handleDeleteProduct, product, sendModalStatusToParent}) {

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
                                Delete Product
                                </h3>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                                <span className="text-base items-center">Are you sure to delete <b>{product.name} </b> ?</span>
                                <div className="flex items-center justify-end p-6 rounded-b">
                                <button
                                    className="text-emerald-500 background-transparent font-bold uppercase px-6 h-[40px] text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={closeModal}>
                                    Close
                                </button>
                                <button
                                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 h-[40px] rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    onClick={() => {handleDeleteProduct(product.id); closeModal()}}>
                                    Delete
                                </button>
                                </div>
                            </div>
                            {/*footer*/}
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        )
}