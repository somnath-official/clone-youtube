import { initQueue } from "./jobs";
import { initServer } from "./server";
import { log } from "./utils/log";

(async (): Promise<void>  => {
    // Init Queue
    await initQueue()
    .then(() => log('Queue started'))
    .catch(() => log('Failed to start queue'))

    // Init Server
    await initServer()
    .then((url) => log(url))
    .catch(() => log('Failed to start server'))
})()

process.on('unhandledRejection', (err) => {
    console.error(err)
    process.exit(1)
})