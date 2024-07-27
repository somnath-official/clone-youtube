import Bull from "bull"

export const videoTranscodeJob = async (job: Bull.Job<any>) => {
    console.log(job)
}