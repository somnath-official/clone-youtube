import { config } from "dotenv"
config()

export const TOKEN_CONFIG = {
    key: process.env.JWT_SECRET_KEY || '<MySecretKey>',
    expirationTime: {
        token: process.env.JWT_ACCESS_KEY_EXPIRATION_TIME || '4h',
        refreshToken: process.env.JWT_REFRESH_KEY_EXPIRATION_TIME || '7d',
    }
}