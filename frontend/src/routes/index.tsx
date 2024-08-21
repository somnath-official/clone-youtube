import { useRoutes } from 'react-router-dom'
import { PublicRoutes } from './PublicRoutes'
import { ProtectedRoutes } from './ProtectedRoutes'
import { AuthRoutes } from './AuthRoutes'

export const Routes = () => {
    return useRoutes([
        PublicRoutes,
        ProtectedRoutes,
        AuthRoutes,
    ])
}
