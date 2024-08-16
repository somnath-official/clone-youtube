import { ServerRoute } from "@hapi/hapi";
import Joi from "joi";
import { login } from "../controllers/AuthController";
import { register } from "module";

const TAGS = ['api', 'Auth']

export const AuthRoutes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/auth/register',
        options: {
            tags: TAGS,
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