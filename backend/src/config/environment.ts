import { config } from 'dotenv'

config()

export const NODE_ENVIRONMENT = process.env.NODE_ENV || 'development'

export const SERVER_ENV = {
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 8000,
    ORIGIN: process.env.ORIGIN || '',
}

export const JWT_ENV = {
    SECRET: process.env.JWT_SECRET_KEY || '<MySecretKey>'
}