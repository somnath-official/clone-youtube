import { Request, ResponseToolkit } from "@hapi/hapi";
import { HapiFileType } from "../types";
import { queueProducer } from "../queue";
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

export const Upload = async (req: Request, res: ResponseToolkit) => {
    try {
        const { file } = req.payload as { file: HapiFileType }
        
        const { videoMetadata, audioMetadata } = await getVideoMetaData(file.path)

        await queueProducer("VideoTranscode", {fileName: file.filename, resolution: RESOLUTION_144p})
        await queueProducer("VideoTranscode", {fileName: file.filename, resolution: RESOLUTION_240p})
        await queueProducer("VideoTranscode", {fileName: file.filename, resolution: RESOLUTION_360p})
        await queueProducer("VideoTranscode", {fileName: file.filename, resolution: RESOLUTION_480p})
        await queueProducer("VideoTranscode", {fileName: file.filename, resolution: RESOLUTION_720p})
        await queueProducer("VideoTranscode", {fileName: file.filename, resolution: RESOLUTION_1080p})
        
        return res.response('Success').code(200)
    } catch (err: any) {
        log(err.message)
        return res.response('Internal server error!').code(500)
    }
}