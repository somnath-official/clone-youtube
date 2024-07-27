import { Request, ResponseToolkit } from "@hapi/hapi";
import { HapiFileType } from "../types";

export const Upload = async (req: Request, res: ResponseToolkit) => {
    try {
        const { file } = req.payload as { file: HapiFileType }
        console.log(file)
        return res.response('Success').code(200)
    } catch (err: any) {
        console.log(err.message)
        return res.response('Internal server error!').code(500)
    }
}