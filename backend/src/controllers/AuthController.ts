import { Request, ResponseToolkit } from "@hapi/hapi"
import { generateRefreshToken, generateToken } from "../utils/jwt"
import { PrismaClient } from "@prisma/client"
import Boom from "@hapi/boom"
import bcrypt from 'bcrypt'

const {
    user: User
} = new PrismaClient()

export const login = async (req: Request, res: ResponseToolkit) => {
    try {
        return res.response('Success').code(200)
    } catch (err: any) {
        console.log(err.message)
        return res.response('Internal server error!').code(500)
    }
}

export const register = async (req: Request, res: ResponseToolkit) => {
    try {
        const { name, email, password } = req.payload as { name: string, email: string, password: string }

        // Check for duplicate email
        const existingUser = await User.findFirst({
            where: { email }
        })

        if (existingUser) return Boom.badData('Email already exists!')

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            data: {
                name,
                email,
                password: hashedPassword,
                username: email,
            },
            select: {
                id: true
            }
        })

        // Create tokens
        const accessToken = generateToken({ userId: newUser.id })
        const refreshToken = generateRefreshToken({ userId: newUser.id })

        // Setting cookie for refreshToken
        res.state('refreshToken', refreshToken, {
            ttl: 15 * 24 * 60 * 60 * 1000,      // 15days
            isSecure: true,
            isHttpOnly: true,
        })

        return res.response({ accessToken }).code(201)
    } catch (err: any) {
        console.log(err.message)
        return res.response('Internal server error!').code(500)
    }
}