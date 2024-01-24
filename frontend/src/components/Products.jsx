import { useState, useEffect } from "react";
import { ProductForm } from "../forms/ProductForm";


export function ProductsData() {

    const [products, setProducts] = useState([]);

    // get products from products rest api
    useEffect( () => {
        fetch("http://127.0.0.1:8000/api/products/").then((res) =>{
            return res.json();
        }).then((data) => {
            setProducts(data);
        })
    },[])

    return (
        <>
        <table className="table-auto border-collapse border border-slate-400">
            <thead>
                <tr>
                    <th className="border border-slate-300">Name</th>
                    <th className="border border-slate-300">Protein</th>
                    <th className="border border-slate-300">Carbohydrates</th>
                    <th className="border border-slate-300">Fat</th>
                    <th className="border border-slate-300">Calories</th>
                </tr>
            </thead>
            <tbody>  
                    {products.map((product, index) => {
                        return (
                        <tr className="border border-1" key={index}>
                            <td className="border border-1 text-center">{product.name}</td>
                            <td className="border border-1 text-center">{product.protein}</td>
                            <td className="border border-1 text-center">{product.carbohydrates}</td>
                            <td className="border border-1 text-center">{product.fat}</td>
                            <td className="border border-1 text-center">{product.calories}</td>
                        </tr>   
                        );
                    })}
                
            </tbody>
        </table>
        <ProductForm />
        </>
    )

}