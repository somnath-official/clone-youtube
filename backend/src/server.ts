import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import { routes } from "./routes";
import { SERVER_OPTIONS } from "./config/server";
import { log } from "./utils/log";

export const initServer = async () => {
    try {
        log('Starting the server')
        const server: Server = Hapi.server(SERVER_OPTIONS);
        
        // Routes register
        await server.register(routes, {
            routes: {
                prefix: '/api'
            }
        })
    
        await server.start();
        return `Server started. Server URL -> http://${server.info.host}:${server.info.port}`
    } catch (err: any) {
        throw new Error(err.message)
    }
}