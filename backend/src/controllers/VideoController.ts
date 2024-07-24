import { Request, ResponseToolkit } from "@hapi/hapi";
import { FilePayloadType } from "../types";

export const Upload = async (req: Request, res: ResponseToolkit) => {
    try {
        const { file } = req.payload as { file: FilePayloadType }
        console.log(file)
        return res.response('Hello World').code(200)
    } catch (err: any) {
        console.log(err.message)
        return res.response('Internal server error!').code(500)
    }
}