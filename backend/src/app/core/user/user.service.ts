import { ConflictException, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findByEmail(email: string): Promise<User | null> {
        return await this.userModel.findOne({ email }).exec()
    }

    async createOne(name: string, email: string, password: string): Promise<void> {
        if (await this.findByEmail(email)) throw new ConflictException('Email already exists!')
        await this.userModel.create({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            sub: randomUUID(),
        })    
    }

    async findUserBySub(sub: string): Promise<User | null> {
        return await this.userModel.findOne({ sub }).exec()
    }
}
