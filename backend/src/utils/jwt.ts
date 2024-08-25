import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { TOKEN_CONFIG } from '../config/token';

config()

export const generateToken = ({ userId }: { userId: number }): string => {
    const token = jwt.sign(
        { userId, type: 'accessToken' },
        TOKEN_CONFIG.key,
        {
            expiresIn: TOKEN_CONFIG.expirationTime.token
        }
    );

    return token
}

export const generateRefreshToken = ({ userId }: { userId: number }): string => {
    const refreshToken = jwt.sign(
        { userId, type: 'refreshToken' },
        TOKEN_CONFIG.key,
        {
            expiresIn: TOKEN_CONFIG.expirationTime.refreshToken
        }
    );

    return refreshToken
}