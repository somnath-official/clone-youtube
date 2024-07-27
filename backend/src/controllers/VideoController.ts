import { Request, ResponseToolkit } from "@hapi/hapi";
import { HapiFileType } from "../types";
import { JOB_TYPE } from "../constants/Job";
import { queueProducer } from "../queue";
import { log } from "../utils/log";

export const Upload = async (req: Request, res: ResponseToolkit) => {
    try {
        const { file } = req.payload as { file: HapiFileType }
        
        await queueProducer(JOB_TYPE.videoTranscode._144p, {fileName: file.filename})
        await queueProducer(JOB_TYPE.videoTranscode._240p, {fileName: file.filename})
        await queueProducer(JOB_TYPE.videoTranscode._360p, {fileName: file.filename})
        await queueProducer(JOB_TYPE.videoTranscode._480p, {fileName: file.filename})
        await queueProducer(JOB_TYPE.videoTranscode._720p, {fileName: file.filename})
        await queueProducer(JOB_TYPE.videoTranscode._1080p, {fileName: file.filename})
        
        return res.response('Success').code(200)
    } catch (err: any) {
        log(err.message)
        return res.response('Internal server error!').code(500)
    }
}