import { Link } from "react-router-dom";

export function Home() {

    return (    
    <>
        <nav className="flex flex-row h-screen text-white">
            <div className="nav bg-slate-500 p-4">
            <ul>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/recipes">Recipes</Link></li>
            </ul>
            </div>
        </nav>
    </>)
}