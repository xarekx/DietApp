import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


export function RecipeDetails({getCookie}) {
    // we're handling recipeId from the path
    const params = useParams();

    const [recipeDetails, setRecipeDetails] = useState(null);
    const [countPortion, setCountPortion] = useState(1);
    const [protein, setProtein] = useState(0);
    const [carbohydrates, setCarbohydrates] = useState(0);
    const [fat, setFat] = useState(0);
    const [calories, setCalories] = useState(0);
    const csrftoken = getCookie('csrftoken');

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/recipes/"+params.recipeId,
            {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrftoken
            },
            credentials: 'include'
            })
            .then((res) => res.json())
            .then((data) => {
                setRecipeDetails(data);
            })
            .catch((error) => {console.error('Error fetching recipe details:', error)});
           
    },[params.recipeId, csrftoken]);

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

    const handleAddPortion = () => {
        setCountPortion(countPortion + 1);
        handleNutritionalValue(countPortion + 1);
    }

    const handleRemovePortion = () => {
        if (countPortion > 1) {
            setCountPortion(countPortion - 1);
            handleNutritionalValue(countPortion - 1);
        }
    }

    if (!recipeDetails) {
        return <div>Loading...</div>;
    }
      
    return (
        <div className="flex flex-col ms-auto me-auto w-full md:w-10/12 mt-10 h-fit md:text-sm lg:text-lg">
            <img className="md:w-9/12 h-fit md:h-[30vw] ms-auto me-auto md:rounded-3xl" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
            <span className="w-4/5 text-2xl md:w-2/3 ms-auto me-auto mt-4 lg:mt-8 font-bold md:text-3xl ">{recipeDetails.title}</span>
            <div className="flex flex-col md:flex-row w-4/5 text-base lg:text-xl md:w-2/3 ms-auto me-auto mt-4 justify-between">
                <div className="mt-4 md:text-lg">Portions : 
                    <span className="ms-1">{countPortion} </span>
                    <Fab size="small" color="secondary" aria-label="add" style={{marginRight:'1em', marginLeft:'1em'}} onClick={handleAddPortion}>
                        <AddIcon className="w-[0.5em]" />
                    </Fab>
                    <Fab size="small" color="secondary" aria-label="sub" className="ml-4" disabled={countPortion === 1} onClick={handleRemovePortion}>
                        <RemoveIcon />
                    </Fab>
                </div>
                <div className="flex flex-col w-4/5 md:w-1/2 mt-4 lg:text-lg">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col text-center">
                            <span>Calories</span> 
                            <span>{calories.toFixed(0)}</span>
                        </div>
                        <div className="flex flex-col text-center">
                            <span>Protein</span>
                            <span>{protein.toFixed(0)}</span>
                        </div>
                        <div className="flex flex-col text-center">
                            <span>Fat</span>
                            <span>{fat.toFixed(0)}</span>
                        </div>
                        <div className="flex flex-col text-center">
                            <span>Carbs</span>
                            <span>{carbohydrates.toFixed(0)}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex justify-between w-4/5 md:w-2/3 ms-auto me-auto mb-4 lg:text-xl">
                <div className="flex flex-col mt-4">
                    <span><b>Ingredients</b></span>
                    <ul className="flex flex-col mt-2 md:mt-3">
                        {recipeDetails.ingredients.map((ingredient, index) => (
                            <li key={index}>
                                <p>{ingredient.product.name}</p>
                                <p className="ms-2 text-sm lg:text-base">{ingredient.quantity*countPortion}g</p>
                            </li>
                        ))}
                    </ul> 
                </div>
                
            </div>  
        </div>
    );
}