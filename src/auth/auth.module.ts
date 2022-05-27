import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { User, UserSchema } from "src/users/user.schema";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from "./jwt.strategy";
import { UsersModule } from "src/users/user.module";
import { UsersService } from "src/users/user.service";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: `2022`,
            signOptions: { expiresIn: "30d" }
        })
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, UsersService],
    controllers: [AuthController]
})

export class AuthModule { }