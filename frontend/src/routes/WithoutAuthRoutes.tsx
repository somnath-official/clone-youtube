import { Outlet, RouteObject } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { GuestGuard } from "../guards/GuestGuard";

export const WithoutAuthRoutes: RouteObject = {
    path: '/',
    element:  <Outlet />,
    children: [
      {
        path: '/',
        element: <Home />
      },

      // Auth routes
      {
        path: '/login',
        element: <GuestGuard><Login /></GuestGuard>
      },
      {
        path: '/register',
        element: <Register />
      },
    ]
}
