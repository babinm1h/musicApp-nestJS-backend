import { Module } from "@nestjs/common";
import { UsersController } from "./user.controller";
import { UsersService } from "./user.service";
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from "./user.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    providers: [UsersService],
    controllers: [UsersController]
})

export class UsersModule { }