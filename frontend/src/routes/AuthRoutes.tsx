import { RouteObject } from "react-router-dom";
import { Login } from "../pages/Auth/Login";
import { MainLayout } from "../layouts/MainLayout";
import { Register } from "../pages/Auth/Register";
import { GuestGuard } from "../guards/GuestGuard";

export const AuthRoutes: RouteObject = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/login',
            element: <GuestGuard><Login /></GuestGuard>,
        },
        {
            path: '/register',
            element: <Register />,
        }
    ]
}