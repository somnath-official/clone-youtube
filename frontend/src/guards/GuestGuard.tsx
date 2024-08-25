import { ReactElement, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const GuestGuard = ({ children }: {children: ReactElement | null}) => {
    const { isLoggedIn } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (isLoggedIn) navigate('/', { replace: true})
    }, [isLoggedIn, location.pathname, navigate])
    return (children)
}
