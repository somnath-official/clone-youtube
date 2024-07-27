import Bull from "bull"
import dotenv from 'dotenv'
import { REDIS_HOST, REDIS_PORT } from "../config/redis"
import { log } from "../utils/log"

dotenv.config()

export let Queue: Bull.Queue<any> | null = null

export const initQueue = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            log('Starting queue')
            Queue = new Bull('youtube-queue', {
                redis: {
                    port: REDIS_PORT,
                    host: REDIS_HOST
                }
            })

            resolve()
        } catch (err: any) {
            log(err.message)
            reject(err.message)
        }
    })
}