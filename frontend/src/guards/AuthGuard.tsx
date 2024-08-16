import { ReactElement, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AuthGuard = ({ children }: {children: ReactElement | null}) => {
    const { token } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        console.log('AuthGuard: ', location.pathname)
        if (!token) navigate('login', { replace: true, state: {prevRoute: location.pathname} })
    }, [token, location.pathname, navigate])
    return (children)
}
