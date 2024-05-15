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
import { UserLogin } from "./components/Login";


function App() {

  const [ recipeToggle, recipeSetToggle ] = useState(false);
  const [ currentUser, setCurrentUser] = useState(false);
  
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    
    if (parts.length === 2) 
      return parts.pop().split(';').shift();
  }

  const handleCurrentUser = (userStatus) => {
    setCurrentUser(userStatus);
    console.log(currentUser);
  }

  const submitLogout = (e) => {
    e.preventDefault();
    const csrftoken = getCookie('csrftoken');
    fetch("http://127.0.0.1:8000/api/user/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrftoken
            },
            credentials: 'include'
        }
      ).then((response) => {
        if (response.ok) {
          setCurrentUser(false);
        }
      }).catch((error) => {console.error("Something went wrong with logout", error)})
  }

  return (<>

    <Router>
        <main className="flex flex-col bg-slate-200 min-h-screen">
          <header>
            <nav>
              <div className="w-full">
                <div className="flex justify-between h-16 px-10 shadow ">
                  <div className="flex items-center">
                    <Link to="/" onClick={()=>recipeSetToggle(false)}>
                      <PiBowlFoodFill className="w-10 h-10"/>
                    </Link>
                  </div>
                  {currentUser ? 
                  ( 
                    (<>
                    <div className="flex items-center">
                      <div className="text-gray-800 text-sm mr-4">USERNAME</div> 
                      <Link to={'/logout'} className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm" onClick={(e)=> submitLogout(e)}>Logout</Link> 
                    </div>
                    </>)):
                  (
                    <div className="flex items-center">
                      <Link to={'/login'} className="text-gray-800 text-sm mr-4">LOGIN</Link> 
                      <Link to={'/register'} className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm">SIGN UP</Link> 
                    </div>
                  )}
                  
                </div>
              </div>
            </nav>
          </header>
          <div id="content" className="flex">
            <nav className="flex flex-col text-sm md:text-xl px-10 items-stretch min-w-[10vw] ms-10">
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
              <Route path='/products' element={<ProductsData getCookie={getCookie}/>}/>
              <Route path="/products/:productId" element={<ProductDetails getCookie={getCookie} />} />
              <Route path='/recipes' element={<RecipesData getCookie={getCookie} />}/>
              <Route path='/recipes/:recipeId' element={<RecipeDetails getCookie={getCookie} />}/>
              <Route path='/recipes/add' element={<AddRecipeForm getCookie={getCookie} />}/>
              <Route path='/login' element={<UserLogin getCookie={getCookie} userStatus={handleCurrentUser} />}/>
          </Routes>
          </div>
        </main>
    </Router>
    </>);
}

  
export default App;