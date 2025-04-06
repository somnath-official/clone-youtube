import Hapi from "@hapi/hapi";
import { SERVER_ENV } from "./environment";

const { HOST, PORT, ORIGIN } = SERVER_ENV

export const SERVER_OPTIONS: Hapi.ServerOptions = {
    host: HOST,
    port: PORT,
    routes: {
        cors: {
            origin: ORIGIN ? [ORIGIN] : ['*'],
        },
        validate: {
            failAction: async (req, res, err) => {
                return err
            },
            options: {
                abortEarly: false
            }
        }
    }
}