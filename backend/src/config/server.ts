import Hapi from "@hapi/hapi";
import dotenv from 'dotenv'

dotenv.config()

export const SERVER_OPTIONS: Hapi.ServerOptions = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8000,
    routes: {
        cors: {
            origin: process.env.ORIGIN ? [process.env.ORIGIN] : ['*'],
        },
        validate: {
            failAction: async (req, res, err) => {
                return err
            },
        }
    }
}