import Bull from "bull"
import { JOB_TYPE } from "../../constants/Job"
import {
    videoTranscode_1080p,
    videoTranscode_144p,
    videoTranscode_240p,
    videoTranscode_360p,
    videoTranscode_480p,
    videoTranscode_720p
} from "./videoTranscode"

export const JOB_LISTS: {type: string, action: (job: Bull.Job<any>) => void}[] = [
    {
        type: JOB_TYPE.videoTranscode._144p,
        action: (job) => videoTranscode_144p(job),
    },
    {
        type: JOB_TYPE.videoTranscode._240p,
        action: (job) => videoTranscode_240p(job),
    },
    {
        type: JOB_TYPE.videoTranscode._360p,
        action: (job) => videoTranscode_360p(job),
    },
    {
        type: JOB_TYPE.videoTranscode._480p,
        action: (job) => videoTranscode_480p(job),
    },
    {
        type: JOB_TYPE.videoTranscode._720p,
        action: (job) => videoTranscode_720p(job),
    },
    {
        type: JOB_TYPE.videoTranscode._1080p,
        action: (job) => videoTranscode_1080p(job),
    }
]