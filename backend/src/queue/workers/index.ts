import Bull from "bull"
import { mergeVideoChunks, videoTranscode } from "./video"
import { MergeVideoChunkPayloadType, QueueTypes, SendEmailPayloadType, VideoTranscodePayloadType } from "../../types"
import { sendEmail } from "./email"

export const JOB_LISTS: {type: QueueTypes, action: (job: Bull.Job<any>) => void}[] = [
    {
        type: 'VideoTranscode',
        action: (job) => videoTranscode(job.data.data as VideoTranscodePayloadType)
    },
    {
        type: 'SendEmail',
        action: (job) => sendEmail(job.data.data as SendEmailPayloadType),
    },
    {
        type: 'MergeVideoChunk',
        action: (job) => mergeVideoChunks(job.data.data as MergeVideoChunkPayloadType),
    }
]