import { Request, ResponseToolkit } from "@hapi/hapi"
import { generateRefreshToken, generateToken } from "../utils/jwt"

export const login = async (req: Request, res: ResponseToolkit) => {
    try {
        return res.response('Success').code(200)
    } catch (err: any) {
        console.log(err.message)
        return res.response('Internal server error!').code(500)
    }
}

export const register = async (req: Request, res: ResponseToolkit) => {
    try {
        const { name, email, password } = req.payload as { name: string, email: string, password: string }
        const accessToken = generateToken({userId: 1})
        const refreshToken = generateRefreshToken({accessToken})
        
        // Setting cookie for refreshToken
        res.state('refreshToken', refreshToken, {
            ttl: 86400000,       // 1d in ms
            isSecure: true,
            isHttpOnly: true,
        })
        
        return res.response({accessToken}).code(200)
    } catch (err: any) {
        console.log(err.message)
        return res.response('Internal server error!').code(500)
    }
}