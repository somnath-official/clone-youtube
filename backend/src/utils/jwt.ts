import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { TOKEN_CONFIG } from '../config/token';

config()

export const generateToken = ({ userId }: { userId: number }): string => {
    const token = jwt.sign(
        { userId },
        TOKEN_CONFIG.key,
        {
            expiresIn: TOKEN_CONFIG.expirationTime.token
        }
    );

    return token
}

export const generateRefreshToken = ({ accessToken }: { accessToken: string }): string => {
    const decoded = jwt.decode(accessToken) as jwt.JwtPayload
    console.log(decoded)
    const refreshToken = jwt.sign(
        { userId: decoded.userId },
        TOKEN_CONFIG.key,
        {
            expiresIn: TOKEN_CONFIG.expirationTime.refreshToken
        }
    );

    return refreshToken
}