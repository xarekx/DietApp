import { useState, useEffect } from "react";
import React from 'react';


export function RecipesData() {


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
        <ul>
            {recipes.map((recipe, index ) => {
                return (
                    <li key={index}>
                            {recipe.title}
                            <ul>
                                {recipe.ingredients.map((ingredient, index) => 
                                    <li key={index}>    
                                    {ingredient.product_name} - {ingredient.quantity}
                                    </li>
                                )}
                            </ul>
                            
                    </li>
                );
            })}
        </ul>
        
        </>

    );

}