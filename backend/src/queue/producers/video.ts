import { Queue } from "../index";
import { VideoTranscodePayloadType, TypeVideoTranscodeQueue } from "../../types";
import { log } from "../../utils/log";

export const VideoTranscodeQueue = async (data: VideoTranscodePayloadType) => {
    if (Queue) {
        const type: TypeVideoTranscodeQueue = 'VideoTranscode'

        const res = await Queue.add({ type, data })
        log(`Queue created. type: ${type} and queue-id: ${res.id}`)
    }
}