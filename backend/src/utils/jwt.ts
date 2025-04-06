import jwt from 'jsonwebtoken'
import { TOKEN_CONFIG } from '../config/token';
import { JWT_ENV } from '../config/environment';

const { SECRET: JWT_SECRET } = JWT_ENV

export const generateToken = ({ userId }: { userId: number }): string => {
    const token = jwt.sign(
        { userId, type: 'accessToken' },
        JWT_SECRET,
        { expiresIn: TOKEN_CONFIG.expirationTime.token }
    );

    return token
}

export const generateRefreshToken = ({ userId }: { userId: number }): string => {
    const refreshToken = jwt.sign(
        { userId, type: 'refreshToken' },
        JWT_SECRET,
        { expiresIn: TOKEN_CONFIG.expirationTime.refreshToken }
    );

    return refreshToken
}

export const decodeJwtToken = (token: string): jwt.JwtPayload => {
    return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload
}

export const verifyJwtRefreshToken = (token: string, userId: number): boolean => {
    let status = false

    jwt.verify(
        token,
        JWT_SECRET,
        (err, decoded) => {
            const data = decoded as {userId: number, type: string}
            
            if (err) status = false
            else if (data.type !== 'refreshToken') status = false
            else if (userId !== data.userId) status = false
            else status = true
        }
    )

    return status
}