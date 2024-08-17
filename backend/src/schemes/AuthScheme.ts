import Hapi, { Request, ResponseToolkit } from '@hapi/hapi'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv';
import Boom from '@hapi/boom';

config()

export const jwtScheme = (server: Hapi.Server<Hapi.ServerApplicationState>) => {
    return {
        authenticate: function (request: Request, h: ResponseToolkit) {
            const req = request.raw.req;
            let token = req.headers.authorization;

            if (!token) return h.unauthenticated(new Error('Missing auth token'))

            token = token.replace(/Bearer /g, '')
            
            try {
                const decoded: jwt.JwtPayload = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as jwt.JwtPayload
                return h.authenticated({ credentials: decoded })
            } catch (err) {
                console.log(err)
                return Boom.unauthorized('Authentication failed')
            }
        }
    };
}