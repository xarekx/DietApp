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
    
    return (
        <>
            <div className="grid grid-flow-col grid-cols-6 ms-auto me-auto">
                {recipes.map((recipe, recipeIndex) => {
                    return(
                        <div class="max-w-sm h-fit rounded overflow-hidden shadow-lg " key={recipeIndex}>
                            <img class="w-full" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"/>
                            <div class="px-6 py-4">
                                <div class="font-bold text-xl mb-2">{recipe.title}</div>
                                <p class="text-gray-700 text-base">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                                </p>
                                <p className="float-right ">
                                    <button className="border border-black p-1">Click me</button>
                                </p>
                            </div>
                            <div class="clear-both   px-6 pt-4 pb-2">
                            </div>
                        </div>
                    )
                })};
            </div>
        </>
    );

}