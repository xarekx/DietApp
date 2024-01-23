import { useState, useEffect } from "react";
// import React from 'react';


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

    // return (
    //     <>
    //         <div class="dropdown">
    //             <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    //                 Lista Produktów
    //             </button>
    //             <ul className="dropdown-menu">
    //                 {products.map((product, index)=> {
    //                     return (
    //                     <li key={index}>
    //                         <a class="dropdown-item" href={product.id}>{product.name}</a>
    //                     </li>)
    //                 })}
                    
    //             </ul>
    //         </div>
    //     </>
    // )

}