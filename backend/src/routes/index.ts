import { Server } from "@hapi/hapi";
import { videoRoutes } from "./VieoRoutes";
import { AuthRoutes } from "./AuthRoutes";

export const routes = {
    name: 'base-route',
    version: '1.0.0',
    register: (server: Server) => {
        server.route(AuthRoutes)
        server.route(videoRoutes)
    }
}