import { JwtModuleOptions } from "@nestjs/jwt";
import { config } from 'dotenv'

config()

export const JwtOptions: JwtModuleOptions = {
    global: true,
    secret: process.env.JWT_SECRET ?? 'My Top Secret Key',
}

export const jwtTokenConfig = {
    accessToken: {
        expiration: process.env.JWT_ACCESS_TOKEN_EXPIRATION ?? '15m',
        type: 'accessToken',
    },
    refreshToken: {
        expiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION ?? '7d',
        type: 'refreshToken',
    },
};