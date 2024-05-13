import { useState, useEffect } from "react";
import React from 'react';
import { Link } from "react-router-dom";

export function RecipesData() {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/recipes/').then((res) => {
            return res.json();
        }).then((data) => {
            setRecipes(data);
            console.log(data);
        });
    }, []);

    console.log(recipes);

    return (
        <>
            <div className="flex flex-col ms-auto me-auto w-2/3 mt-10 rounded-t shadow-xl bg-white h-fit md:text-sm lg:text-lg">
                {/* // TODO - filter buttons */}
                <div className="h-10 w-full bg-black filterButton"></div>
                {/* // TODO - card view */}
                <div className="grid grid-cols-4 gap-x-8 w-5/6 me-auto ms-auto mt-[4vh] mb-8 gap-y-8">
                    {recipes.map((recipe, recipeIndex) => {
                        return (
                            <div className="relative max-w-sm rounded shadow-lg" key={recipeIndex}>
                                <img className="w-full" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
                                <div className="">
                                    <div class="font-bold md:mb-8 lg:mb-16 text-center text-wrap md:p-0.5 lg:p-2">{recipe.title}</div>
                                    <Link to={`/recipes/${recipe.id}`} className="absolute bottom-2 right-2 md:p-0.5 lg:p-1 lg:bottom-4 lg:right-4 border 
                                    border-slate-400 shadow-sm rounded-md hover:pointer hover:shadow-md hover:cursor-pointer">
                                        Show
                                    </Link>
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