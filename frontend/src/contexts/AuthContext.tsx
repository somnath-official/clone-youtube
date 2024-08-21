import { createContext, useEffect, useState } from "react";
import { IAuthContext, ILoginAuthData } from "../interfaces/Auth";
import { IUser } from "../interfaces/User";
import { axiosService } from "../utils/axiosService";
import { API_ROUTES } from "../apis";
import { AxiosError } from "axios";

export const AuthContext = createContext<IAuthContext | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactElement }) => {
    const [isLoadingAuth, setIsLoadingAuth] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<IUser | null>(null)

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            setIsLoadingAuth(true)
            const token = localStorage.getItem('token')

            if (token) {
                const user = (await axiosService.get(API_ROUTES.auth.user)).data
                setIsLoggedIn(true)
                setUser(user)
            }
        } catch (err) {
            setIsLoggedIn(false)
            setUser(null)
        } finally {
            setIsLoadingAuth(false)
        }
    }

    const signIn = async (payload: ILoginAuthData) => {
        try {
            const res = (await axiosService.post(API_ROUTES.auth.login, payload)).data
            localStorage.setItem('token', res.accessToken)
            const user = (await axiosService.get(API_ROUTES.auth.user)).data
            setIsLoggedIn(true)
            setUser(user)
        } catch (err) {
            setIsLoggedIn(false)
            setUser(null)
            if(err instanceof AxiosError) throw new Error(err.response?.data.message)
            else throw new Error('Something went wrong!')
        }
    }

    return (
        <AuthContext.Provider
            value={{
                isLoadingAuth,
                isLoggedIn,
                user,
                signIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}