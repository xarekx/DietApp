import { useState, useEffect } from "react";
import React from 'react';
import { ProductsData } from "./Products";


export function RecipesData() {

    // const newRecipe = {
    //     "id": 2,
    //     "title": "Naleśniki z serem i owocami",
    //     "ingredients": [
    //         {
    //             "product_name": "Ser twarogowy chudy",
    //             "quantity": 125
    //         },
    //         {
    //             "product_name": "Naleśniki",
    //             "quantity": 180
    //         },
    //         {
    //             "product_name": "Jogurt naturalny",
    //             "quantity": 100
    //         },  
    //         {
    //             "product_name": "Truskawki",
    //             "quantity": 75
    //         }
    //     ]
    // }


    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/recipes/').then((res) => {
            return res.json();
        }).then((data) => {
            setRecipes(data);
        });
    }, []);
    
    //   Dodawanie receptury
    // const handleAddRecipe = () => {
    //     const newRecipes = [ ... recipes];
    //     newRecipes.push(newRecipe);
    //     setRecipes(newRecipes);
    // };


    
    return (
        <>
        <div className="">
            <ul>
                {recipes.map((recipe, index ) => {
                    return (
                        <li key={index}>
                                {recipe.title}
                                <ul>
                                    {recipe.ingredients.map((ingredient, index) => 
                                        <li key={index}>    
                                        {ingredient.product_name} - {ingredient.quantity}g
                                        </li>
                                    )}
                                </ul>
                        </li>
                    );
                })}
            </ul>
        </div>
        <ProductsData />
        {/* <button className="btn btn-primary">Dodaj przepis</button> */}
        </>

    );

}