import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }

    async findById(id: mongoose.Types.ObjectId) {
        const user = await this.userModel.findById(id).populate("playlist")
        if (!user) throw new BadRequestException("User with such ID not found")
        return user
    }


}