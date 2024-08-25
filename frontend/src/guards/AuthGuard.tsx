import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { ReactElement, useEffect } from "react"

export const AuthGuard = ({ children }: {children: ReactElement | null}) => {
    const { isLoggedIn } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!isLoggedIn) navigate('/login', { replace: true, state: {redirectFrom: location} })
    }, [isLoggedIn, location, navigate])
    return (children)
}