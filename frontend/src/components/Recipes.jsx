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
            <div className="flex flex-col ms-auto me-auto w-2/3 mt-10 rounded-t shadow-xl bg-white h-fit">
                {/* // TODO - filter buttons */}
                <div className="h-10 w-full bg-black filterButton"></div>
                {/* // TODO - card view */}
                <div className="grid grid-flow-col grid-cols-4 gap-x-4 w-2/3 me-auto ms-auto h-full mt-[4vh] mb-8">
                    {recipes.map((recipe, recipeIndex) => {
                        return(
                            <div className="max-w-sm h-fit rounded shadow-lg" key={recipeIndex}>
                                <img className="w-full" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"/>
                                <div className="px-6 py-4">
                                    <div class="font-bold text-md mb-2 text-center">{recipe.title}</div>
                                    <p className="float-right mt-2 text-sm">
                                        <button className="border border-slate-400 shadow-sm rounded-md ps-2 pe-2 pt-1 pb-1 hover:pointer hover:shadow-md">Show</button>
                                    </p>
                                </div>
                                <div className="clear-both px-4 pt-2 pb-1">
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );

}