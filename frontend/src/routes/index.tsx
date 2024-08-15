import { useRoutes } from 'react-router-dom'
import { WithAuthRoutes } from './WithAuthRoutes'
import { WithoutAuthRoutes } from './WithoutAuthRoutes'

export const Routes = () => {
    return useRoutes([
        WithoutAuthRoutes,
        WithAuthRoutes,
    ])
}
