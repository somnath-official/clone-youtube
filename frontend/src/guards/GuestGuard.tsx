import { ReactElement, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const GuestGuard = ({ children }: {children: ReactElement | null}) => {
    const { token } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (token) navigate('/', { replace: true})
    }, [token, location.pathname, navigate])
    return (children)
}
