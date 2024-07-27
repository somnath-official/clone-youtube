import { Request, ResponseToolkit } from "@hapi/hapi";
import { HapiFileType } from "../types";
import { JOB_TYPE } from "../constants/Job";
import { Queue } from "../queue";
import { log } from "../utils/log";

export const Upload = async (req: Request, res: ResponseToolkit) => {
    try {
        const { file } = req.payload as { file: HapiFileType }
        if (Queue) {
            const res = await Queue.add({
                type: JOB_TYPE.videoTranscode,
                data: { file }
            })

            log(res)
        }
        return res.response('Success').code(200)
    } catch (err: any) {
        log(err.message)
        return res.response('Internal server error!').code(500)
    }
}