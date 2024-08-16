import { Outlet, RouteObject } from "react-router-dom";
import { AuthGuard } from "../guards/AuthGuard";
import { Dashboard } from "../pages/admin/Dashboard";

export const WithAuthRoutes: RouteObject = {
    path: '/',
    element:  <AuthGuard><Outlet /></AuthGuard>,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      },
    ]
}
