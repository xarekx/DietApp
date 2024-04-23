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
    const [protein, setProtein] = useState(0);
    const [carbohydrates, setCarbohydrates] = useState(0);
    const [fat, setFat] = useState(0);
    const [calories, setCalories] = useState(0);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/recipes/"+params.recipeId)
            .then((res) => res.json())
            .then((data) => {
                setRecipeDetails(data);
            })
            .catch((error) => {console.error('Error fetching recipe details:', error)});
           
    }, [params.recipeId]);

    useEffect(() => {
        if (recipeDetails) {
            handleNutritionalValue(countPortion);
        }
        // eslint-disable-next-line
    }, [recipeDetails]);

    const handleNutritionalValue = (portions) => {
        // let finalProtein = 0;
        let nutritions = {
            "protein":0,
            "carbohydrates":0,
            "fat":0,
            "calories":0
        }

        recipeDetails.ingredients.forEach((ingredient)=> {
                nutritions.protein += Number(((ingredient.product.protein*ingredient.quantity)*portions)/100)
                nutritions.carbohydrates += Number(((ingredient.product.carbohydrates*ingredient.quantity)*portions)/100)
                nutritions.fat += Number(((ingredient.product.fat*ingredient.quantity)*portions)/100)
                nutritions.calories += Number(((ingredient.product.calories*ingredient.quantity)*portions)/100)
        })

        setProtein(nutritions.protein);
        setCarbohydrates(nutritions.carbohydrates);
        setFat(nutritions.fat);
        setCalories(nutritions.calories);

    }

    if (!recipeDetails) {
        return <div>Loading...</div>;
    }
      
    return (
        <div className="flex flex-col ms-auto me-auto w-2/3 mt-10 rounded-t shadow-xl bg-white h-fit md:text-sm lg:text-lg">
            <img className="w-4/5 h-1/4 ms-auto me-auto" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
            <div className="w-2/3 ms-auto me-auto mt-4">
                <span className="font-bold text-3xl ">{recipeDetails.title}</span>
                <div className="mt-4 text-lg">Portions : 
                    {countPortion} 
                    <Fab size="small" color="secondary" aria-label="add" style={{marginRight:'1em', marginLeft:'1em'}} onClick={()=>{setCountPortion(countPortion+1); handleNutritionalValue(countPortion+1);}}>
                        <AddIcon />
                    </Fab>
                    <Fab size="small" color="secondary" aria-label="sub" className="ml-4" onClick={()=>{setCountPortion(countPortion-1);handleNutritionalValue(countPortion-1);}}>
                        <RemoveIcon />
                    </Fab>
                </div>
            </div>
            <div className="flex justify-between w-2/3 ms-auto me-auto">
                <div className="flex flex-col">
                    <span>Ingredients</span>
                    <ul className="flex flex-col mt-4">
                        {recipeDetails.ingredients.map((ingredient, index) => (
                            <li key={index}>
                                <p>{ingredient.product.name}</p>
                                <p className="ms-2 text-sm">{ingredient.quantity*countPortion}g</p>
                            </li>
                        ))}
                    </ul> 
                </div>
                <div className="flex flex-col w-1/2">
                    <span>Nutritional values</span>
                    <div className="flex justify-between me-2">
                        <span>Protein: {protein.toFixed(0)}</span>
                        <span>Carbohydrates: {carbohydrates.toFixed(0)}</span>
                        <span>Fat: {fat.toFixed(0)}</span>
                        <span>Calories: {calories.toFixed(0)}</span>
                    </div>
                </div>
            </div>  
        </div>
    );
}