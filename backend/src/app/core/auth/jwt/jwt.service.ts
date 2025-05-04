import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IJwtTokenPayload } from "./interfaces/JwtPayload";
import { jwtTokenConfig } from "../../../../config/jwt.config";
import { UserService } from "../../user/user.service";
import { User } from "src/schemas/user.schema";

@Injectable()
export class Jwt {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) {}

    async generateAccessToken(payload: IJwtTokenPayload) {
        return await this.jwtService.signAsync(
            {
                ...payload,
                type: jwtTokenConfig.accessToken.type
            },
            {
                expiresIn: jwtTokenConfig.accessToken.expiration
            },
        )
    }

    async generateRefreshToken(payload: IJwtTokenPayload) {
        return await this.jwtService.signAsync(
            {
                ...payload,
                type: jwtTokenConfig.refreshToken.type
            },
            {
                expiresIn: jwtTokenConfig.refreshToken.expiration
            },
        )
    }

    async verifyAccessToken(access_token: string): Promise<User> {
        try {
            if (!access_token) throw new UnauthorizedException();
            
            const { sub, type }: IJwtTokenPayload = await this.jwtService.verifyAsync(access_token);

            if (type !== jwtTokenConfig.accessToken.type || !sub) throw new UnauthorizedException();

            const user = await this.userService.findUserBySub(sub);
            if (!user) throw new UnauthorizedException();

            return user;
        } catch {
            throw new UnauthorizedException();
        }
    }

    async verifyRefreshToken(refresh_token: string): Promise<{sub: string}> {
        try {
            if (!refresh_token) throw new UnauthorizedException();
    
            const { sub, type }: IJwtTokenPayload = await this.jwtService.verifyAsync(refresh_token);
            if (type !== jwtTokenConfig.refreshToken.type || !sub) throw new UnauthorizedException();
    
            const user = await this.userService.findUserBySub(sub)
            if (!user) throw new UnauthorizedException()
    
            return { sub }
        } catch {
            throw new UnauthorizedException();
        }
    }
}