import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { Jwt } from './jwt/jwt.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: Jwt
    ) {}

    async signUp(name: string, email: string, password: string): Promise<{ message: string }> {
        await this.userService.createOne(name, email, password);
    
        return {
            message: 'Registration is successful. Plase login.',
        };
    }

    async signIn( email: string, password: string ): Promise<{ access_token: string; refresh_token: string }> {
        const user = await this.userService.findByEmail(email);
        if (!user || !user.password) throw new UnauthorizedException('Invalid username or password');
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException('Invalid username or password');
    
        const access_token = await this.jwtService.generateAccessToken({ sub: user.sub });
        const refresh_token = await this.jwtService.generateRefreshToken({ sub: user.sub });
    
        return { access_token, refresh_token };
    }

    async refreshTheAccessToken( refresh_token: string ): Promise<{ access_token: string }> {
        const { sub } = await this.jwtService.verifyRefreshToken(refresh_token)
        const access_token = await this.jwtService.generateAccessToken({ sub });
        
        return {
          access_token,
        };
    }
}
