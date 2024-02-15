import { useState, useEffect } from "react";
import { ProductForm } from "../forms/ProductForm";
import { HiDotsHorizontal } from "react-icons/hi";

export function ProductsData() {

    const [products, setProducts] = useState([]);

    // get products from products rest api
    useEffect( () => {
        fetch("http://127.0.0.1:8000/api/products/").then((res) =>{
            return res.json();
        }).then((data) => {
            setProducts(data);
        })
    },[]);

    const [toggle, setToggle] = useState(false);
    
    return (
        <>
        <div className="flex flex-col ms-auto me-auto w-2/3 mt-10 border-2 border-white rounded-t">
            {/* card header */}
            <div className="flex justify-between p-4">
                <span className="text-xl font-bold">Products</span>
                <div className="flex text-center">
                    <ProductForm />
                </div>
            </div>
            <table className="table-auto">
                <thead>
                    <tr className="text-base">
                        {/* table headers */}
                        {/* <th className="text-start"></th> */}
                        <th className="text-start ps-4 w-1/2">Name</th>
                        <th className="text-start p-2">Protein</th>
                        <th className="text-start p-2">Carbohydrates</th>
                        <th className="text-start p-2">Fat</th>
                        <th className="text-start p-2">Calories</th>
                    </tr>
                </thead>
                <tbody>  
                    {products.map((product, index) => {
                        return (
                        <tr className="text-start hover:text-white" key={index}>
                            {/* table content */}
                            {/* <td className="text-center">{index+1}</td> */}
                            <td className="ps-4">{product.name}</td>
                            <td className="p-2">{product.protein}</td>
                            <td className="p-2">{product.carbohydrates}</td>
                            <td className="p-2">{product.fat}</td>
                            <td className="p-2">{product.calories}</td>
                            {/* dropdown dots */}
                            <td className="p-2 text-xl"><HiDotsHorizontal className="hover:text-white ms-auto me-auto"/></td>
                        </tr>   
                        );
                    })}
                </tbody>
            </table>
            
        </div>
        </>
    )

}