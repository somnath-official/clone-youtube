import Hapi, { Request, ResponseToolkit } from '@hapi/hapi'
import jwt from 'jsonwebtoken'
import Boom from '@hapi/boom';
import { PrismaClient } from '@prisma/client';
import { log } from '../utils/log';
import { decodeJwtToken } from '../utils/jwt';

const {
    user: User
} = new PrismaClient()

export const customJwtPlugin = {
    name: 'jwtPlugin',
    version: '1.0.0',
    register: async function (server: Hapi.Server<Hapi.ServerApplicationState>) {
        server.auth.scheme('custom_jwtScheme', jwtScheme)
        server.auth.strategy('jwt', 'custom_jwtScheme')
        server.auth.default('jwt')
    }
}

function jwtScheme(server: Hapi.Server<Hapi.ServerApplicationState>) {
    return {
        authenticate: async function (request: Request, h: ResponseToolkit) {
            const req = request.raw.req;
            let token = req.headers.authorization;

            if (!token) return Boom.unauthorized('Authentication failed')

            token = token.replace(/Bearer /g, '')
            
            try {
                const decoded: jwt.JwtPayload =  decodeJwtToken(token)
                const user = await User.findFirst({
                    where: { id: decoded.userId },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        username: true,
                        is_active: true,
                        is_verified: true,
                        avatar: true,
                    }
                })

                if (user) {
                    return h.authenticated({ credentials: {...decoded, user} })
                }
                
                return h.authenticated({ credentials: decoded })
            } catch (err: any) {
                log(err.message)
                return Boom.unauthorized('Authentication failed')
            }
        }
    };
}