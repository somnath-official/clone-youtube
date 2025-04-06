import { Request, ResponseToolkit } from "@hapi/hapi";
import path from "path";
import fs from "fs"
import { log } from "../utils/log";
import { v4 as uuidv4 } from 'uuid';

export const Upload = async (req: Request, res: ResponseToolkit) => {
    try {
        const { file } = req.payload as { file: any }
        const fileName = file.hapi.filename
        const extension = (file.hapi.filename as string).split('.').pop()
        const contentType = file.hapi.headers['content-type']
        const videoId = uuidv4().replace(/-/g, '_')
        const rawVideosPath = path.resolve(`videos/raw`)

        if (!fs.existsSync(rawVideosPath)) await fs.mkdirSync(rawVideosPath, { recursive: true })

        await fs.promises.writeFile(`${rawVideosPath}/${videoId}.${extension}`, file)

        return res.response({ video_id: videoId }).code(200)
    } catch (err: any) {
        log(err.message)
        return res.response('Internal server error!').code(500)
    }
}