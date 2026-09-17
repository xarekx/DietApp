import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout"
import { AuthLayout } from "./layouts/AuthLayout"
import { PublicLayout } from "./layouts/PublicLayout"
import { LandingPage } from "./pages/public/LandingPage";
import { Dashboard } from "./pages/app/Dashboard";
import { Products } from "./pages/app/Products";
import { RecipesData } from "./components/recipes/Recipes";
import { DietsData } from "./components/diets/Diets";
import { UserLogin } from "./components/login/Login";
import { UserRegister } from "./components/login/Register";

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
