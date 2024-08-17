import { config } from "dotenv"
config()

export const TOKEN_CONFIG = {
    key: process.env.JWT_SECRET_KEY || '<MySecretKey>',
    expirationTime: {
        token: '4h',
        refreshToken: '15d',
    }
}