import { Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./user.service";


@Controller("/user")

export class UsersController {
    constructor(private userService: UsersService) { }

    @Post("/register")
    register() {
        return this.userService.register()
    }

    @Post("/login")
    login() {
        return this.userService.login()
    }

    @Get("/logout")
    logout() {
        return this.userService.logout()
    }


    @Get("/check")
    check() {
        return this.userService.check()
    }
}