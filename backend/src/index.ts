import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import dotenv from "dotenv"
import { routes } from "./routes";

dotenv.config()

export const init = async function(): Promise<void> {
    const server: Server = Hapi.server({
        port: process.env.PORT || 8000,
        host: 'localhost'
    });

    // Routes register
    await server.register(routes, {
        routes: {
            prefix: '/api'
        }
    })

    await server.start();
    console.log(`Server started on http://${server.settings.host}:${server.settings.port}`);
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init()