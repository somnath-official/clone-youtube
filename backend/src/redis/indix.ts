import Redis from "ioredis"
import { REDIS_HOST, REDIS_PORT } from "../config/redis"
import { log } from "../utils/log"

export const redis = new Redis({
    port: REDIS_PORT,
    host: REDIS_HOST,
    maxRetriesPerRequest: 5
})

export const initRedis = async () => {
    log('Checking Redis')

    await redis.ping('Test')
    .catch(() => {
        throw new Error('Unable to initiate Redis! Please ensure that Redis is running on your system.')
    })

    log('Redis is running!')
}