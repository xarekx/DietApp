import { useState, useEffect } from "react";
import React from 'react';
import { Link } from "react-router-dom";

export function RecipesData({getCookie}) {

    const [recipes, setRecipes] = useState([]);
    const csrftoken = getCookie('csrftoken');

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/recipes/',
        {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrftoken
            },
            credentials: 'include'
            }
        ).then((res) => {
            return res.json();
        }).then((data) => {
            setRecipes(data);
        }).catch((error) => console.error('Something went wrong with fetching recipes', error));
    }, [csrftoken]);

    return (
        <>
            <div className="flex flex-col ms-auto me-auto h-fit text-xs lg:text-lg">
                {/* // TODO - card view */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-4 lg:gap-x-8 w-5/6 md:w-2/3 lg:w-3/4 me-auto ms-auto mt-[4vh] mb-8 gap-y-4 md:gap-y-8">
                    {recipes.map((recipe, recipeIndex) => {
                        return (
                            <div className="flex flex-col max-w-sm rounded shadow-lg md:text-xs lg:text-sm" key={recipeIndex}>
                                <img className="w-full" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
                                <div className="">
                                    <div class="font-bold m-1 mb-4 text-center md:p-0.5 lg:p-1 h-6 md:h-14 md:m-2 lg:m-1">{recipe.title}</div>
                                    <Link to={`/recipes/${recipe.id}`} className="flex w-fit pe-1.5 ps-1.5 ml-auto mb-2 me-2 md:mb-4 md:me-4
                                    border-slate-400 shadow-sm rounded-sm p-1 md:p-1.5 md:pe-4 md:ps-4 md:rounded-md hover:pointer hover:shadow-md hover:cursor-pointer bg-indigo-600 text-white">
                                        Show
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );

}