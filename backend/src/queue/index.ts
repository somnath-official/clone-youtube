import Bull from "bull"
import dotenv from 'dotenv'
import { REDIS_HOST, REDIS_PORT } from "../config/redis"
import { log } from "../utils/log"
import { JOB_LISTS } from "./workers"
import { QueueTypes } from "../types"

dotenv.config()

export let Queue: Bull.Queue<any> | null = null

export const initQueue = async (): Promise<void> => {
    log('Starting Queue')

    Queue = new Bull('youtube-queue', {
        redis: {
            port: REDIS_PORT,
            host: REDIS_HOST
        }
    })
    .on('completed', async (job) => {
        log(`Job complete! type: ${job.data.type}, queue-id: ${job.id}`)
        await job.remove()
    })

    Queue.process(async (job) => {
        const temp = JOB_LISTS.find(t => t.type === job.data.type)
        if (temp) temp.action(job)
    })

    log('Queue is running!')
}

export const queueProducer = async (type: QueueTypes, data: any) => {
    if (Queue) {
        const res = await Queue.add({ type, data })
        log(`Queue created. type: ${type} and queue-id: ${res.id}`)
    }
}