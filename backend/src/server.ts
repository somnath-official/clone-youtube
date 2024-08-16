import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import { routes } from "./routes";
import { SERVER_OPTIONS } from "./config/server";
import { log } from "./utils/log";
import inert from "@hapi/inert";
import vision from '@hapi/vision';
import hapiswagger from "hapi-swagger";
import { swaggerOptions } from "./config/swagger";

export const initServer = async () => {
    log('Starting server')
    const server: Server = Hapi.server(SERVER_OPTIONS);
    
    await server.register([
        inert,
        vision,
        {
            plugin: hapiswagger,
            options: swaggerOptions
        }
    ])

    // Routes register
    await server.register(routes, {
        routes: {
            prefix: '/api'
        }
    })

    await server.start();
    log(`Server started. Server URL -> http://${server.info.host}:${server.info.port}`)

    return server
}