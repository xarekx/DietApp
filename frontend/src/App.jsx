import React from "react";
import { RecipesData } from "./components/Recipes";
import { ReactDOM } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Products } from "./pages/Products";
import { Recipes } from "./pages/Recipes";
import { Home } from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index="/" element={<Home/>}/>
        <Route path='/products' element={<Products />}/>
        <Route path='/recipes' element={<Recipes />}/>
      </Routes>  
    </BrowserRouter>  
  );
}

  
export default App;