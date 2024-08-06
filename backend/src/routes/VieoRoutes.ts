import { ServerRoute } from "@hapi/hapi";
import { Upload } from "../controllers/VideoController";
import Joi from "joi";

const TAGS = ['Api', 'Videos']

export const videoRoutes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/video/upload',
        options: {
            tags: TAGS,
            handler: Upload,
            validate: {
                payload: Joi.object({
                    file: Joi.any().meta({ swaggerType: 'file' }).required()
                })
            },
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            payload: {
                maxBytes: 1024 * 1024 * 1024 * 1,
                multipart: {
                    output: 'stream'
                },
                parse: true
            },
        },
    }
]