import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/users/user.schema";
import * as bcrypt from "bcryptjs"
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from "./dto/authDto";

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ) { }


    async validateUser(email: string, password: string) {
        const user = await (await this.userModel.findOne({ email })).populate("playlist")
        if (!user) throw new BadRequestException("User with this email not found")

        const comparedPassword = await bcrypt.compare(password, user.password)
        if (!comparedPassword) {
            throw new BadRequestException("Wrong password")
        }
        return user
    }



    async login(user: any) {
        const payload = { id: user._id }
        const token = this.jwtService.sign(payload)
        return { token, data: user }
    }


    async register(dto: AuthDto) {
        const candidate = await (await this.userModel.findOne({ email: dto.email })).populate("playlist")
        if (candidate) throw new BadRequestException("User with this email already exist")

        const hashedPassword = await bcrypt.hash(dto.password, 6)
        const user = await this.userModel.create({ email: dto.email, password: hashedPassword })

        const payload = { id: user._id }
        const token = this.jwtService.sign(payload)
        return { token, data: user }
    }

}