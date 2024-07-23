import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import dotenv from "dotenv"

dotenv.config()

export const init = async function(): Promise<void> {
    const server: Server = Hapi.server({
        port: process.env.PORT || 8000,
        host: 'localhost'
    });

    // Routes will go here

    console.log(`Server started on http://${server.settings.host}:${server.settings.port}`);
    server.start();
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});