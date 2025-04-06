import { ServerRoute } from "@hapi/hapi";
import { Upload } from "../controllers/VideoController";
import Joi from "joi";

const TAGS = ['api', 'Videos']

export const videoRoutes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/video/upload',
        options: {
            tags: TAGS,
            handler: Upload,
            validate: {
                payload: Joi.object({
                    file: Joi.any().meta({ swaggerType: 'file' }).required(),
                })
            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            payload: {
                maxBytes: 1024 * 1024 * 1024 * 1, // 1GB
                multipart: {
                    output: 'stream'
                },
                parse: true,
                timeout: false,
            },
        },
    }
]