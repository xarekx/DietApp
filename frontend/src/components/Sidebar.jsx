import { ChefHat, PackageOpen, CalendarDays, ShoppingCart, LogOut, Users, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export function Sidebar() {
        //   fixed lg:relative inset-y-0 left-0 z-50
        //   w-64 bg-white border-r border-gray-200 flex flex-col
        //   transform transition-transform duration-300 ease-in-out
        //   -translate-x-full lg:translate-x-0
        
    return (
        <>
        {/* <div></div> */}
        <aside className="fixed lg:relative w-64 border-r border-gray-200">
            
                <div className="border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-green-500 lg:block p-6 border-gray-200">DietApp</h1>
                </div>
                <div className="border-b border-gray-200 p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex bg-green-100 rounded-full w-10 h-10 items-center justify-center">
                            <Users strokeWidth={2} size={24} className='w-5 h-5 text-green-600'/>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">Zalogowany USER</p>
                            <p className="text-xs text-gray-600">zalogowany.user@email.com</p>
                        </div>

                    </div>
                    <button className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                       <LogOut size={24} strokeWidth={2} className='w-4 h-4'/>Wyloguj się
                    </button>
                </div>
            <nav className="flex-1 p-4 overflow-y-auto">
                <div className='space-y-2'>
                    <NavLink to={"/app/recipes"}
                        className={({isActive}) => `flex w-full justify-start gap-2 hover:bg-gray-100 focus:bg-green-100 space-x-3 px-4 py-3 rounded-xl text-gray-700 ${isActive ? "bg-green-100": "hover:bg-green-100"}`}>
                            <ChefHat size={24} strokeWidth={2} className='w-5 h-5 flex-shrink-0' />Przepisy
                    </NavLink>
                </div>
                <div className='space-y-2'>
                    <NavLink 
                        to={"/app/products"}
                        className={({isActive}) => `flex w-full justify-start gap-2 hover:bg-gray-100 focus:bg-green-100 space-x-3 px-4 py-3 rounded-xl text-gray-700 ${isActive ? "bg-green-100": "hover:bg-green-100"}`}>
                            <PackageOpen size={24} strokeWidth={2} className='w-5 h-5 flex-shrink-0' />Produkty
                    </NavLink>
                </div> 
                <div className='space-y-2'>
                    <NavLink 
                    to={"app/diets"}
                    className={({isActive})=> `flex w-full justify-start gap-2 hover:bg-gray-100 focus:bg-green-100 space-x-3 px-4 py-3 rounded-xl text-gray-700 ${isActive ? "bg-green-100" : "hover:bg-green-100"}`}>
                        <CalendarDays size={24} strokeWidth={2} className='w-5 h-5 flex-shrink-0' />Kalendarz Diety
                    </NavLink>
                </div> 
                <div className='space-y-2'>
                    <NavLink 
                    to={"/app/shopping-list"}
                    className={({isActive})=> `flex w-full justify-start gap-2 hover:bg-gray-100 focus:bg-green-100 space-x-3 px-4 py-3 rounded-xl text-gray-700 ${isActive ? "bg-green-100": "hover:bg-green-100"}`}>
                        <ShoppingCart size={24} strokeWidth={2} className='w-5 h-5 flex-shrink-0' />Lista zakupów
                    </NavLink>
                </div>    
            </nav>
            <div>

            </div>
        </aside>
        </>
    )
}