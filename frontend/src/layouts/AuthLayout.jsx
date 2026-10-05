import { Navigate, Outlet } from "react-router-dom"
import { useCurrentUser } from "../api/hooks"
export function AuthLayout() {
    const {data, isPending } = useCurrentUser();

    if (isPending) return null;
    if (data) return <Navigate to="/app/products" replace />;

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <Outlet />
        </div>
    )
    
}