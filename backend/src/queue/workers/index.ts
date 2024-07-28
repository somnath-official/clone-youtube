import Bull from "bull"
import { videoTranscode } from "./videoTranscode"
import { QueueTypes, VideoTranscodePayloadType } from "../../types"

export const JOB_LISTS: {type: QueueTypes, action: (job: Bull.Job<any>) => void}[] = [
    {
        type: 'VideoTranscode',
        action: (job) => {
            const data: VideoTranscodePayloadType = job.data.data
            videoTranscode(data)
        }
    }
]