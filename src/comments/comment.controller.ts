import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import mongoose from "mongoose";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";


@Controller("/comments")

export class CommentController {
    constructor(private commentService: CommentService) { }

    @UseGuards(JwtGuard)
    @Post("/")
    createComment(@Body() dto: CreateCommentDto, @Request() req) {
        const userId: mongoose.Types.ObjectId = req.user._id
        return this.commentService.createComment(dto, userId)
    }
}