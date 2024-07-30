import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { PiBowlFoodFill } from "react-icons/pi";
import { ProductDetails } from "./components/products/ProductDetails";
import { ProductsData } from "./components/products/Products";
import { RecipesData } from "./components/recipes/Recipes";
import { DietsData } from "./components/diets/Diets";
import { Home } from "./components/Home";
import { IoArrowDown } from "react-icons/io5";
import { IoArrowForward } from "react-icons/io5";
import { AddRecipeForm } from "./forms/AddRecipeForm";
import { RecipeDetails } from "./components/recipes/RecipeDetails";
import { UserLogin } from "./components/login/Login";
import { UserRegister } from "./components/login/Register";
import MenuIcon from '@mui/icons-material/Menu';
import { getCookie } from "./utils/getCookie";
import { useFetch } from "./hooks/useFetch";
import { redirect } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import BakeryDiningOutlinedIcon from '@mui/icons-material/BakeryDiningOutlined';
import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { CreateDietPlan } from "./components/diets/CreateDietPlan";

function App() {
  const [recipeToggle, recipeSetToggle] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const [username, setUsername] = useState('');
  const [toggleMenu, setToggleMenu] = useState(false);

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

  const logoutHandler = useFetch('http://127.0.0.1:8000/api/user/logout', 'POST');

  const handleLogout = (e) => {
    logoutHandler()
      .then((res) => {
        if (res.ok) {
          localStorage.setItem("username", '');
          setCurrentUser(false);
          e.preventDefault();
          redirect('/login');
        }
      })
      .catch((error) => { console.error("something went wrong with logout", error) });
  }

  const handleMenu = () => {
    setToggleMenu((prev) => !prev);
  };

  useEffect(() => {
    const menuNavBar = document.getElementById("menuNavBar");
    if (toggleMenu) {
      menuNavBar.classList.remove('hidden');
      menuNavBar.classList.add('absolute');
    } else {
      menuNavBar.classList.remove('absolute');
      menuNavBar.classList.add('hidden');
    }
  }, [toggleMenu]);

  return (
    <>
      <Router>
        <main className="flex flex-col bg-slate-200 min-h-screen">
          <nav>
            <div className="w-full flex justify-between shadow">
              <div className="flex h-16 items-center">
                <div className="flex ms-4 md:hidden" onClick={handleMenu}>
                  <MenuIcon />
                </div>
                <div className="flex ms-4">
                  <Link to="/" onClick={() => { recipeSetToggle(false); setToggleMenu(false); }}>
                    <PiBowlFoodFill className="w-10 h-10" />
                  </Link>
                </div>
              </div>
              <div className="flex items-center me-2">
                {currentUser ?
                  (
                    (<>
                      <div className="text-gray-800 text-sm mr-4" id="username">{username}</div>
                      <Link to={'/login'} className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm" onClick={(e) => handleLogout(e)}>Logout</Link>
                    </>)) :
                  (<>
                    <Link to={'/login'} className="text-gray-800 text-sm mr-4" onClick={() => setToggleMenu(false)}>LOGIN</Link>
                    <Link to={'/register'} className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm" onClick={() => setToggleMenu(false)}>SIGN UP</Link>
                  </>
                  )}
              </div>
            </div>
          </nav>
          <div id="wrapper" className="flex">
            <nav className="absolute z-10 w-1/2 md:w-fit bg-white top-16 text-sm ps-4 pe-4 h-calc-100vh-minus-4rem md:h-fit hidden transit md:flex md:bg-transparent" id="menuNavBar">
              <ul className="logo text-black text-left mt-8">
                <li>
                  <Link to={'/'} className="nav-link" onClick={() => { recipeSetToggle(false); setToggleMenu(false); }}>
                    <HomeOutlinedIcon className="mr-2" fontSize="medium" />Home</Link>
                </li>
                <li>
                  <Link to={'/products'} className="nav-link" onClick={() => { recipeSetToggle(false); setToggleMenu(false); }}>
                    <ListAltOutlinedIcon className="mr-2" fontSize="medium" />Products</Link>
                </li>
                <li>
                  <span className="flex hover:cursor-pointer items-center pe-2" onClick={() => recipeSetToggle(!recipeToggle)}>
                    <BakeryDiningOutlinedIcon className="mr-2" fontSize="medium" />Recipes
                    {recipeToggle === false ?
                      (
                        <>
                          <IoArrowForward className="text-base ms-5 mt-1 me-2" />
                        </>
                      ) :
                      (
                        <>
                          <IoArrowDown className="text-base ms-5 mt-1 me-2" />
                        </>)
                    }
                  </span>
                  <ul className={`text-sm transition-max-height duration-500 overflow-hidden ${recipeToggle ? 'max-h-64' : 'max-h-0'}`}>
                    
                    <Link to={'/recipes'} className="nav-link"><li className="ms-2 mt-1 hover:cursor-pointer hover:opacity-40" onClick={() => { setToggleMenu(false) }}>
                      <GridOnOutlinedIcon className="mr-2" fontSize="medium" /> Recipes List</li>
                    </Link>
                    <Link to={'/recipes/add'}><li className="ms-2 mt-1 hover:cursor-pointer hover:opacity-40" onClick={() => { setToggleMenu(false) }}>
                      <AddBoxOutlinedIcon className="mr-2" fontSize="medium" />Create Recipe</li>
                    </Link>
                  </ul>
                </li>
                <li>
                  <Link to={'/diets'} className="nav-link" onClick={() => { recipeSetToggle(false); setToggleMenu(false); }}>
                    <CalendarMonthOutlinedIcon className="mr-2" fontSize="medium" /> Diets</Link>
                </li>
                <li>
                  <Link to={'/diets/create'} className="nav-link" onClick={() => { recipeSetToggle(false); setToggleMenu(false); }}>
                  Create Diet</Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/products' element={<ProductsData />} />
              <Route path="/products/:productId" element={<ProductDetails />} />
              <Route path='/recipes' element={<RecipesData />} />
              <Route path='/recipes/:recipeId' element={<RecipeDetails />} />
              <Route path='/recipes/add' element={<AddRecipeForm getCookie={getCookie} />} />
              <Route path='/login' element={<UserLogin userStatus={handleCurrentUser} />} />
              <Route path='/register' element={<UserRegister />} />
              <Route path='/diets' element={<DietsData />} />
              <Route path='/logout' element={<UserLogin />} />
              <Route path='/diets/create' element={<CreateDietPlan />} />
            </Routes>
          </div>
        </main>
      </Router>
    </>
  );
}

export default App;
