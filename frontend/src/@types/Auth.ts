export interface IAuthContext {
    user: null
    token: string
    login: (data: ILoginAuthData) => Promise<void>
    logout: () => void
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