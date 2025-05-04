import { config } from 'dotenv'

config()

export const appConfiguration = {
    port: process.env.PORT ?? 8000,
    apiPrefix: 'api'
}