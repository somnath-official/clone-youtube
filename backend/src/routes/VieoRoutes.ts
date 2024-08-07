import { ServerRoute } from "@hapi/hapi";
import { initUpload, Upload } from "../controllers/VideoController";
import Joi from "joi";

const TAGS = ['Api', 'Videos']

export const videoRoutes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/video/upload/init',
        options: {
            tags: TAGS,
            handler: initUpload,
        },
    },
    {
        method: 'POST',
        path: '/video/upload',
        options: {
            tags: TAGS,
            handler: Upload,
            validate: {
                payload: Joi.object({
                    file: Joi.any().meta({ swaggerType: 'file' }).required(),
                    chunkNumber: Joi.number().required(),
                    totalChunks: Joi.number().required(),
                    originalname: Joi.string().required(),
                    serverTempFileName: Joi.string().required(),
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