import { RouteObject } from "react-router-dom";
import { Profile } from "../pages/User/Profile";
import { MainLayout } from "../layouts/MainLayout";
import { AuthGuard } from "../guards/AuthGuard";
import { Dashboard } from "../pages/User/Dashboard";

export const ProtectedRoutes: RouteObject = {
    path: '/',
    element: <AuthGuard><MainLayout /></AuthGuard>,
    children: [
        {
            path: '/profile',
            element: <Profile />
        },
        {
            path: '/dashboard',
            element: <Dashboard />
        }
    ]
}