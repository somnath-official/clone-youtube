import { Body, Controller, Get, HttpStatus, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dtos/Signup.dto';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/Signin.dto';
import { NoAuth } from './auth.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @NoAuth()
    @Post('register')
    async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
        const { name, email, password } = signUpDto
        const data = await this.authService.signUp(name, email, password)
        res.status(HttpStatus.CREATED).send(data);
    }

    @NoAuth()
    @Post('login')
    async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
        const { access_token, refresh_token } = await this.authService.signIn(signInDto.email, signInDto.password)
        res.cookie('refresh_token', refresh_token);
        res.cookie('access_token', access_token);
        res.status(HttpStatus.OK).send({ access_token, refresh_token });
    }

    @NoAuth()
    @Post('refresh')
    async refreshToken(@Req() request: Request, @Res() res: Response) {
        const refresh_token: string = (request.cookies['refresh_token'] as string) ?? '';
        if (!refresh_token) throw new UnauthorizedException();

        const { access_token } = await this.authService.refreshTheAccessToken(refresh_token);
        res.cookie('access_token', access_token);
        res.status(HttpStatus.OK).send({ access_token });
    }

    @Post('logout')
    logout(@Res() res: Response) {
        res.clearCookie('access_token')
        res.clearCookie('refresh_token')
        res.status(HttpStatus.OK).json({ message: 'Successfully logout!' });
    }

    @Get('user')
    getAuthUser(@Req() req: Request) {
        if (req.user) {
            const { name, email, sub } = req.user
            return {
                name,
                email,
                sub,
            }
        }
        return {}
    }
}
