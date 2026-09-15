import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PiBowlFoodFill } from "react-icons/pi";
import { AppLayout } from "./layouts/AppLayout"
import { AuthLayout } from "./layouts/AuthLayout"
import { PublicLayout } from "./layouts/PublicLayout"
import { LandingPage } from "./pages/public/LandingPage";
import { Dashboard } from "./pages/app/Dashboard";
import { ProductDetails } from "./components/products/ProductDetails";
// import { ProductsData } from "./components/products/Products";
import { Products } from "./pages/app/Products";
import { RecipesData } from "./components/recipes/Recipes";
import { DietsData } from "./components/diets/Diets";
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

import { CreateDietPlan } from "./components/diets/CreateDietPlan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />}/>
        </Route>
        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />  
        </Route>

        {/* APP Content */}
        <Route element={<AppLayout />}>
          <Route path="/app" element={<Dashboard />} />
          <Route path="/app/products" element={<Products />} />
          {/* <Route path="/app/products/:productId" element={<ProductDetails />} /> */}
          <Route path="/app/recipes" element={<RecipesData />} />
          {/* <Route path="/app/recipes/add" element={<AddRecipeForm />} /> */}
          <Route path="/app/diets" element={<DietsData />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
