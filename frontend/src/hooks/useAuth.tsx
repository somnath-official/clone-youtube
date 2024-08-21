import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export const useAuth = () => {
    const context = useContext(AuthContext)

    return {
        isLoadingAuth: context?.isLoadingAuth,
        isLoggedIn: context?.isLoggedIn,
        user: context?.user,
        signIn: context?.signIn
    }
}