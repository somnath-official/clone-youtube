import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import { routes } from "./routes";
import { SERVER_OPTIONS } from "./config/server";
import { log } from "./utils/log";
import inert from "@hapi/inert";
import vision from '@hapi/vision';
import hapiswagger from "hapi-swagger";
import { SWAGGER_OPTIONS } from "./config/swagger";
import { config } from "dotenv";
import { customJwtPlugin } from "./plugins/Authentication";

config()

export const initServer = async () => {
    log('Starting server')
    const server: Server = Hapi.server(SERVER_OPTIONS);

    await server.register([inert, vision, { plugin: hapiswagger, options: SWAGGER_OPTIONS }])
    await server.register(routes, { routes: { prefix: '/api' } })
    await server.register(customJwtPlugin)

    await server.start();
    log(`Server started. Server URL -> http://${server.info.host}:${server.info.port}`)

    return server
}