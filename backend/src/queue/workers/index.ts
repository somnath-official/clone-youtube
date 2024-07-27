import Bull from "bull"
import { JOB_TYPE } from "../../constants/Job"
import { videoTranscodeJob } from "./videoTranscode"

export const JOB_LISTS: {type: string, action: (job: Bull.Job<any>) => void}[] = [
    {
        type: JOB_TYPE.videoTranscode,
        action: (job) => videoTranscodeJob(job),
    }
]