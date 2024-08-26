import { IUser } from "./User"

export interface IAuthContext {
    isLoadingAuth: boolean
    isLoggedIn: boolean
    user: IUser | null
    signIn: (payload: ILoginAuthData) => Promise<void>
    logOut: () => Promise<boolean>
}

export interface ILoginAuthData {
    email: string
    password: string
}

export interface IRegisterAuthData {
    name: string
    email: string
    password: string
}