import { ServerRoute } from "@hapi/hapi";
import Joi from "joi";
import { login, register } from "../controllers/AuthController";

const TAGS = ['api', 'Auth']

export const AuthRoutes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/auth/register',
        options: {
            tags: TAGS,
            auth: false,
            handler: register,
            validate: {
                payload: Joi.object({
                    name: Joi.string().required(),
                    email: Joi.string().required().email(),
                    password: Joi.string().required().min(8),
                })
            },
        },
    },
    {
        method: 'POST',
        path: '/auth/login',
        options: {
            tags: TAGS,
            auth: false,
            handler: login,
            validate: {
                payload: Joi.object({
                    email: Joi.string().required().email(),
                    password: Joi.string().required().min(8),
                })
            },
        },
    }
]