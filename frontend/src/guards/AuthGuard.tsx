import { ReactElement, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";

export const AuthGuard = ({ children }: {children: ReactElement | null}) => {
    const isLoggedin = false
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        console.log('AuthGuard: ', location.pathname)
        if (!isLoggedin) navigate('login', { replace: true, state: {prevRoute: location.pathname} })
    }, [isLoggedin, location.pathname, navigate])
    return (children)
}
