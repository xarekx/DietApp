import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar"

export function AppLayout() {

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex flex-col flex-1">

                <main className="p-4 flex-1 bg-slate-100 pt-16">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}