import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import mongoose from "mongoose";
import { AuthorService } from "./author.service";

@Controller("/author")

export class AuthorController {
    constructor(private authorService: AuthorService) { }

    @Post()
    create(@Body("name") name: string) {
        return this.authorService.create(name)
    }

    @Get(":id")
    getOne(@Param("id") id: mongoose.Types.ObjectId) {
        return this.authorService.getOne(id)
    }
}