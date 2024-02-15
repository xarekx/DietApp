import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { PiBowlFoodFill } from "react-icons/pi";
import { ProductDetails } from "./components/ProductDetails";
import { ProductsData } from "./components/Products";
import { RecipesData } from "./components/Recipes";
import { Home } from "./components/Home";


function App() {
  return (
    <Router>
        <main className="flex bg-slate-200 min-h-screen">
          <nav className="flex flex-col bg-slate-300 ms-10 text-xl px-10 items-stretch">
          <div className="logo text-black text-center mt-8">
            <Link to="/">
              <PiBowlFoodFill className="w-full h-full"/>
            </Link>
          </div>
          <ul className="logo text-black text-center mt-8">
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
            <li><Link to={'/products'} className="nav-link">Products</Link></li>
            <li><Link to={'/recipes'} className="nav-link">Recipes</Link></li>
          </ul>
          </nav>
          <Routes>
              <Route exact path='/' element={<Home />}/>
              <Route path='/products' element={<ProductsData />}/>
              <Route path="/products/:productId" element={<ProductDetails />} />
              <Route path='/recipes' element={<RecipesData />}/>
          </Routes>
        </main>
    </Router>
  );
}

  
export default App;