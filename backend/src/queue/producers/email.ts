import { Queue } from "../index";
import { QueueTypes, SendEmailPayloadType } from "../../types";
import { log } from "../../utils/log";

export const SendEmailQueue = async (data: SendEmailPayloadType) => {
    if (Queue) {
        const type: QueueTypes = 'SendEmail'

        const res = await Queue.add({ type, data })
        log(`Queue created. type: ${type} and queue-id: ${res.id}`)
    }
}