import { ConflictException, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    findByEmail(email: string) {
        return this.userModel.findOne({ email })
    }

    async createOne(name: string, email: string, password: string) {
        if (await this.findByEmail(email)) throw new ConflictException('Email already exists!')
        this.userModel.create({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            sub: randomUUID(),
        })
    }

    findUserBySub(sub: string){
        return this.userModel.findOne({ sub })
    }

    findUserById(id: string){
        return this.userModel.findById(id)
    }
}
