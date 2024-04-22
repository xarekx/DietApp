import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


export function RecipeDetails() {
    // we're handling recipeId from the path
    const params = useParams();

    const [recipeDetails, setRecipeDetails] = useState(null);
    const [countPortion, setCountPortion] = useState(1);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/recipes/"+params.recipeId)
            .then((res) => res.json())
            .then((data) => {
                setRecipeDetails(data);
            });
    }, [params.recipeId]);

    if (!recipeDetails) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="w-full flex flex-col">
            <img className="w-3/4 h-1/3 ms-auto me-auto" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
            <div className="w-2/3 ms-auto me-auto mt-4">
                <span className="font-bold text-3xl ">{recipeDetails.title}</span>
                <div className="mt-4 text-lg">Liczba porcji :
                    {countPortion} 
                    <Fab size="small" color="secondary" aria-label="add" style={{marginRight:'1em', marginLeft:'1em'}} onClick={()=>setCountPortion(countPortion+1)}>
                        <AddIcon />
                    </Fab>
                    <Fab size="small" color="secondary" aria-label="sub" className="ml-4" onClick={()=>setCountPortion(countPortion-1)}>
                        <RemoveIcon />
                    </Fab>
                </div>
            </div>
            <div className="w-2/3 ms-auto me-auto">
                <span className="font-bold">Składniki</span>
                <ul className="flex flex-col mt-4">
                    {recipeDetails.ingredients.map((ingredient, index) => (
                        <li key={index}>
                            <p>{ingredient.product.name}</p>
                            <p className="ms-2 text-sm">{ingredient.quantity}g</p>
                        </li>
                    ))}
                </ul>
            </div>  
        </div>
    );
}