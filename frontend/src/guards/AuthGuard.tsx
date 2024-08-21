import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { ReactElement, useEffect } from "react"

export const AuthGuard = ({ children }: {children: ReactElement | null}) => {
    const { isLoggedIn } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!isLoggedIn) navigate('/login', { replace: true, state: {prevRoute: location.pathname} })
    }, [isLoggedIn, location.pathname, navigate])
    return (children)
}