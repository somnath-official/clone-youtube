import Hapi from "@hapi/hapi"
import { jwtScheme } from "../middlewares/AuthMiddleware"

export const customJwtPlugin = {
    name: 'jwtPlugin',
    version: '1.0.0',
    register: async function (server: Hapi.Server<Hapi.ServerApplicationState>) {
        server.auth.scheme('custom_jwtScheme', jwtScheme)
        server.auth.strategy('jwt', 'custom_jwtScheme')
        server.auth.default('jwt')
    }
}