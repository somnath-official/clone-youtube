import { config } from "dotenv"
config()

export const TOKEN_CONFIG = {
    key: process.env.JWT_SECRET_KEY || '<MySecretKey>',
    expirationTime: {
        token: '30s',
        refreshToken: '15d',
    }
}