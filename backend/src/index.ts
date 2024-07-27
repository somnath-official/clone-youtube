import { initQueue } from "./queue";
import { initRedis } from "./redis/indix";
import { initServer } from "./server";
import { log } from "./utils/log";

(async (): Promise<void>  => {
    try {
        await initRedis()
        await initQueue()
        await initServer()
    } catch (err: any) {
        log(err.message)
        process.exit(1)
    }
})()

process.on('unhandledRejection', (err) => {
    console.error(err)
    process.exit(1)
})