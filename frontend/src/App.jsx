import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { PiBowlFoodFill } from "react-icons/pi";
import { ProductDetails } from "./components/ProductDetails";
import { ProductsData } from "./components/Products";
import { RecipesData } from "./components/Recipes";
import { Home } from "./components/Home";
import { IoArrowDown } from "react-icons/io5";
import { IoArrowForward } from "react-icons/io5";
import { AddRecipeForm } from "./forms/AddRecipeForm";
import { RecipeDetails } from "./components/RecipeDetails";


function App() {

  const [ recipeToggle, recipeSetToggle ] = useState(false);

  return (
    <Router>
        <main className="flex bg-slate-200 min-h-screen">
          <nav className="flex flex-col bg-slate-300 text-sm md:text-xl px-10 items-stretch 
          w-1/6 ms-10">
          <div className="logo text-black text-center mt-8">
            <Link to="/" onClick={()=>recipeSetToggle(false)}>
              <PiBowlFoodFill className="w-full h-full"/>
            </Link>
          </div>
          <ul className="logo text-black text-left mt-8">
            <li>
              <Link to={'/'} className="nav-link" onClick={()=>recipeSetToggle(false)}>Home</Link>
            </li>
            <li>
              <Link to={'/products'} className="nav-link" onClick={()=>recipeSetToggle(false)}>Products</Link>
            </li>
            <li>
              <span className="flex hover:cursor-pointer items-center justify-between" onClick={()=> recipeSetToggle(!recipeToggle)}>Recipes
                { recipeToggle === false ? 
                (
                  <>
                    <IoArrowForward className="text-base mt-1 me-2"/> 
                  </>
                ): 
                (
                  <>
                    <IoArrowDown className="text-base mt-1 me-2"/>
                  </>) 
                }
              </span>
              {recipeToggle ?
              ( 
                <ul className="text-sm">
                  <Link to={'/recipes'} className="nav-link"><li className="ms-2 mt-1 hover:cursor-pointer hover:opacity-40">Recipes List</li>
                  </Link>
                  <Link to={'/recipes/add'}><li className="ms-2 mt-1 hover:cursor-pointer hover:opacity-40">Create Recipe</li>
                  </Link>
                </ul>
              ):null
              }
                
            </li>
              
          </ul>
          </nav>
          <Routes>
              <Route exact path='/' element={<Home />}/>
              <Route path='/products' element={<ProductsData />}/>
              <Route path="/products/:productId" element={<ProductDetails />} />
              <Route path='/recipes' element={<RecipesData />}/>
              <Route path='/recipes/:recipeId' element={<RecipeDetails />}/>
              <Route path='/recipes/add' element={<AddRecipeForm />}/>
          </Routes>
        </main>
    </Router>
  );
}

  
export default App;