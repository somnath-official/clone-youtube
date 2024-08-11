import { Request, ResponseToolkit } from "@hapi/hapi";
import path from "path";
import fs from "fs"
import { log } from "../utils/log";
import { v4 as uuidv4 } from 'uuid';
import { MergeVideoChunkQueue } from "../queue/producers/video";

/**
 * Before initiating the chunk file upload, we need to create a unique fileName
 * which will be used to identify each chunk uniquely
 * 
 * @param req Request
 * @param res ResponseToolKit
 * @returns Promise<ResponseObject>
 */
export const initUpload = async (req: Request, res: ResponseToolkit) => {
    try {
        const tempFileName = uuidv4().replace(/-/g, '_')
        
        return res.response({tempFileName}).code(200)
    } catch (err: any) {
        console.log(err.message)
        return res.response('Internal server error!').code(500)
    }
}

export const Upload = async (req: Request, res: ResponseToolkit) => {
    try {
        const {
            file: chunk,
            chunkNumber,
            totalChunks,
            originalname,
            serverTempFileName,
        } = req.payload as {
            file: any,
            chunkNumber: number,
            totalChunks: number,
            originalname: string
            serverTempFileName: string
        }

        const baseDir = path.resolve('videos')
        const videoDir = baseDir + '/' + serverTempFileName
        const chunkDir = videoDir + "/chunks" // Directory to save chunks

        if (!fs.existsSync(chunkDir)) fs.mkdirSync(chunkDir, {recursive: true})

        const chunkFilePath = `${chunkDir}/chunk_${chunkNumber}`

        await fs.promises.writeFile(chunkFilePath, chunk);

        // TODO - We need to save this payload into DB and pass the job id to to the queue
        if (chunkNumber === totalChunks) {
            await MergeVideoChunkQueue({videoDir, chunkDir, totalChunks, originalname})
            return res.response({
                message: 'Video is uploaded successfully! It will be under review process and you will be notified once it is done.'
            }).code(200)
        }
        
        return res.response({
            message: `Successfully uploaded chunk ${chunkNumber} out of ${totalChunks} chunks`
        }).code(200)
    } catch (err: any) {
        log(err.message)
        return res.response('Internal server error!').code(500)
    }
}