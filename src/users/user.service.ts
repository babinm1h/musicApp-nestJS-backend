import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";



@Injectable()

export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async register() {
        return
    }


    async login() {
        return
    }


    async check() {
        return
    }

    async logout() {
        return
    }
}