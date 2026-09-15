import { useNavigate } from "react-router-dom"

export function Navbar() {
    const navigate = useNavigate();

    return (
        <header className="h-16 sticky top-0 z-50 bg-white shadow">
            <nav>
                <ul className="flex flex-row justify-between items-center mx-auto px-4 max-w-7xl py-4">
                    <li><a href="/">Home</a></li>
                    <li><button className="border rounded-md px-4 py-2 font-semibold text-sm hover:bg-slate-200" onClick={()=> navigate("/login")}>Zaloguj się</button></li>
                </ul>
            </nav>
        </header>
    )
}