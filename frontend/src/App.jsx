import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { PiBowlFoodFill } from "react-icons/pi";
import { ProductDetails } from "./components/ProductDetails";
import { ProductsData } from "./components/Products";
import { RecipesData } from "./components/Recipes";
import { DietsData } from "./components/Diets";
import { Home } from "./components/Home";
import { IoArrowDown } from "react-icons/io5";
import { IoArrowForward } from "react-icons/io5";
import { AddRecipeForm } from "./forms/AddRecipeForm";
import { RecipeDetails } from "./components/RecipeDetails";
import { UserLogin } from "./components/Login";
import { UserRegister } from "./components/Register";
import MenuIcon from '@mui/icons-material/Menu';


function App() {

  const [ recipeToggle, recipeSetToggle ] = useState(false);
  const [ currentUser, setCurrentUser] = useState(false);
  const [ username, setUsername ] = useState('');
  const [ toggleMenu, setToggleMenu ] = useState(false);
 
  
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    
    if (parts.length === 2) 
      return parts.pop().split(';').shift();
  }

  const handleCurrentUser = (userStatus) => {
    checkUserLoggedIn();
    setCurrentUser(userStatus);
  }

  const checkUserLoggedIn = () => {
    // getting actual loggedIn username from local storage
    const loggedInUser = localStorage.getItem("username");
    if (loggedInUser) {
      setCurrentUser(true);
      setUsername(loggedInUser);
    } else {
      setCurrentUser(false);
      setUsername('');
    }
  }
  // checking is user logged in on page refresh
  useEffect(() => {
    checkUserLoggedIn();
  }, []);


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
          localStorage.setItem("username", '');
          setCurrentUser(false);
        }
      }).catch((error) => {console.error("Something went wrong with logout", error)})
  }

  // TODO: End navbar, need vertical expanding
  const handleMenu = () => {
    setToggleMenu((prev) => !prev);
  };

  useEffect(() => {
    const menuNavBar = document.getElementById("menuNavBar");
    if (toggleMenu) {
      menuNavBar.classList.remove('hidden');
      menuNavBar.classList.add('absolute');
    }  else {
      menuNavBar.classList.remove('absolute');
      menuNavBar.classList.add('hidden');
    }
  }, [toggleMenu]);


  return (<>

    <Router>
        <main className="flex flex-col bg-slate-200 min-h-screen">
            <nav>
              <div className="w-full flex justify-between shadow">
                <div className="flex h-16 items-center">
                  <div className="flex ms-4 md:hidden" onClick={handleMenu}>
                    <MenuIcon/>
                  </div>
                  <div className="flex ms-4">
                    <Link to="/" onClick={()=>{recipeSetToggle(false); setToggleMenu(false);}}>
                      <PiBowlFoodFill className="w-10 h-10"/>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center me-2">
                  {currentUser ? 
                  ( 
                    (<>
                      <div className="text-gray-800 text-sm mr-4" id="username">{username}</div> 
                      <Link to={'/logout'} className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm" onClick={(e)=> submitLogout(e)}>Logout</Link> 
                    </>)):
                  (<>
                      <Link to={'/login'} className="text-gray-800 text-sm mr-4" onClick={() => setToggleMenu(false)}>LOGIN</Link> 
                      <Link to={'/register'} className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm" onClick={() => setToggleMenu(false)}>SIGN UP</Link> 
                    </>
                  )}   
                </div>
              </div>
            </nav>
            <nav className="absolute w-full md:w-fit bg-white top-16 text-sm ps-4 h-screen md:h-fit hidden transit md:flex md:absolute md:bg-transparent" id="menuNavBar">
              <ul className="logo text-black text-left mt-8">
                <li>
                  <Link to={'/'} className="nav-link" onClick={()=>{recipeSetToggle(false); setToggleMenu(false);}}>Home</Link>
                </li>
                <li>
                  <Link to={'/products'} className="nav-link" onClick={()=>{recipeSetToggle(false); setToggleMenu(false);}}>Products</Link>
                </li>
                <li>
                  <span className="flex hover:cursor-pointer items-center" onClick={()=> recipeSetToggle(!recipeToggle)}>Recipes
                    { recipeToggle === false ? 
                    (
                      <>
                        <IoArrowForward className="text-base ms-5 mt-1 me-2"/> 
                      </>
                    ): 
                    (
                      <>
                        <IoArrowDown className="text-base ms-5 mt-1 me-2"/>
                      </>) 
                    }
                  </span>
                  {recipeToggle ?
                  ( 
                    <ul className="text-sm">
                      <Link to={'/recipes'} className="nav-link"><li className="ms-2 mt-1 hover:cursor-pointer hover:opacity-40" onClick={()=> {setToggleMenu(false)}}>Recipes List</li>
                      </Link>
                      <Link to={'/recipes/add'}><li className="ms-2 mt-1 hover:cursor-pointer hover:opacity-40" onClick={()=> {setToggleMenu(false)}}>Create Recipe</li>
                      </Link>
                    </ul>
                  ):null
                  }
                </li>
                <li>
                <Link to={'/diets'} className="nav-link" onClick={()=>{recipeSetToggle(false); setToggleMenu(false);}}>Diets</Link>
                </li>        
              </ul>
            </nav>
          <div id="content" className="flex">
            
          <Routes>
              <Route exact path='/' element={<Home />}/>
              <Route path='/products' element={<ProductsData getCookie={getCookie}/>}/>
              <Route path="/products/:productId" element={<ProductDetails getCookie={getCookie} />} />
              <Route path='/recipes' element={<RecipesData getCookie={getCookie} />}/>
              <Route path='/recipes/:recipeId' element={<RecipeDetails getCookie={getCookie} />}/>
              <Route path='/recipes/add' element={<AddRecipeForm getCookie={getCookie} />}/>
              <Route path='/login' element={<UserLogin getCookie={getCookie} userStatus={handleCurrentUser}/>}/>
              <Route path='/register' element={<UserRegister getCookie={getCookie}/>}/>
              <Route path='/diets' element={<DietsData getCookie={getCookie}/>}/>
          </Routes>
          </div>
        </main>
    </Router>
    </>);
}

  
export default App;