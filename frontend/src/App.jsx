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
    // <>
    // <div className="flex flex-row h-screen text-white">
    //     <div className="nav bg-slate-500 p-4">
    //       <ul>
    //         <li>first item</li>
    //         <li>second item</li>
    //         <li>third item</li>
    //       </ul>
    //     </div>
    //     <div className="bg-slate-800 w-screen text-white">
    //     <RecipesData />
    //     </div>
    //   </div>
    // </>
    
  );
}

  
export default App;