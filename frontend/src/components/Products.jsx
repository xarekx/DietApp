import { useState, useEffect } from "react";
import { ProductForm } from "../forms/ProductForm";
import { Link } from "react-router-dom";
import { ProductDetails } from "./ProductDetails";

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

    const getProductId = (productId) => {
        console.log(productId);
    }
    
    return (
        <>
        <div className="flex flex-col ms-auto me-auto w-full mt-10">
            <table className="table-auto border-collapse border-slate-400">
                <thead className="">
                    <tr className="text-base">
                        <th className="border border-slate-400 text-start"></th>
                        <th className="border border-slate-400 text-start p-2">Name</th>
                        <th className="border border-slate-400 text-start p-2">Protein</th>
                        <th className="border border-slate-400 text-start p-2">Carbohydrates</th>
                        <th className="border border-slate-400 text-start p-2">Fat</th>
                        <th className="border border-slate-400 text-start p-2">Calories</th>
                    </tr>
                </thead>
                <tbody>  
                    {products.map((product, index) => {
                        return (
                        <tr className="border border-slate-400 text-start" key={index}>
                            <td className="border border-slate-400 text-center">{index+1}</td>
                            <td className="border border-slate-400 p-2">
                                <Link to={'/products/' + product.id}>
                                    {product.name}
                                </Link>
                            </td>
                            <td className="border border-slate-400 p-2">{product.protein}</td>
                            <td className="border border-slate-400 p-2">{product.carbohydrates}</td>
                            <td className="border border-slate-400 p-2">{product.fat}</td>
                            <td className="border border-slate-400 p-2">{product.calories}</td>
                        </tr>   
                        );
                    })}
                </tbody>
            </table>
            <ProductForm />
        </div>
        </>
    )

}