import { Request, ResponseToolkit } from "@hapi/hapi";
import { HapiFileType } from "../types";
import { log } from "../utils/log";
import { getVideoMetaData } from "../utils/ffmpeg";
import {
    RESOLUTION_1080p,
    RESOLUTION_144p,
    RESOLUTION_240p,
    RESOLUTION_360p,
    RESOLUTION_480p,
    RESOLUTION_720p
} from "../constants/Video";
import { VideoTranscodeQueue } from "../queue/producers/video";
import { SendEmailQueue } from "../queue/producers/email";

export const Upload = async (req: Request, res: ResponseToolkit) => {
    try {
        const { file } = req.payload as { file: HapiFileType }
        
        const { videoMetadata, audioMetadata } = await getVideoMetaData(file.path)

        await VideoTranscodeQueue({fileName: file.filename, resolution: RESOLUTION_144p})
        await VideoTranscodeQueue({fileName: file.filename, resolution: RESOLUTION_240p})
        await VideoTranscodeQueue({fileName: file.filename, resolution: RESOLUTION_360p})
        await VideoTranscodeQueue({fileName: file.filename, resolution: RESOLUTION_480p})
        await VideoTranscodeQueue({fileName: file.filename, resolution: RESOLUTION_720p})
        await VideoTranscodeQueue({fileName: file.filename, resolution: RESOLUTION_1080p})

        await SendEmailQueue({
            sender: "test@google.com",
            receivers: ["user1@google.com","user2@google.com","user3@google.com"],
            message: "This is a test email"
        })
        
        return res.response('Success').code(200)
    } catch (err: any) {
        log(err.message)
        return res.response('Internal server error!').code(500)
    }
}