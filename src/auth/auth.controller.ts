import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthDto } from "src/auth/dto/authDto";
import { AuthService } from "./auth.service";
import { JwtGuard } from "./guards/jwt.guard";
import { LocalGuard } from "./guards/local.guard";

@Controller("/auth")
export class AuthController {

    constructor(private authService: AuthService) { }

    @UseGuards(LocalGuard)
    @Post("/login")
    login(@Request() req,) {
        return this.authService.login(req.user)
    }


    @Post("/register")
    register(@Body() dto: AuthDto) {
        return this.authService.register(dto)
    }


    @UseGuards(JwtGuard)
    @Get('/get-me')
    getProfile(@Request() req) {
        return req.user;
    }
}