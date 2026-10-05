import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar"
import { useCurrentUser } from "../api/hooks";

export function AppLayout() {

    const { isPending, error } = useCurrentUser();

    if (isPending) return null;
    if (error?.status === 401) return <Navigate to="/login" replace />;

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