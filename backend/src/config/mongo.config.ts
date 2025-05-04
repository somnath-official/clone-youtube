import { config } from 'dotenv'

config()

export const mongoConfig = {
    url: process.env.MONGO_URI || ''
}