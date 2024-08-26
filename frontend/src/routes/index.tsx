import { useRoutes } from 'react-router-dom'
import { PublicRoutes } from './PublicRoutes'
import { ProtectedRoutes } from './ProtectedRoutes'
import { AuthRoutes } from './AuthRoutes'
import { PageNotFound } from '../pages/404'

export const Routes = () => {
    return useRoutes([
        PublicRoutes,
        ProtectedRoutes,
        AuthRoutes,
        {
            path: '/*',
            element: <PageNotFound />
        }
    ])
}
