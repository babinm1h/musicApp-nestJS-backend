import { Module } from "@nestjs/common";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.service";
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from "./track.schema";
import { Author, AuthorSchema } from "src/author/author.schema";
import { Comment, CommentSchema } from "src/comments/comment.schema";
import { FileService } from "src/file/file.service";
import { User, UserSchema } from "src/users/user.schema";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
        MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
        MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    controllers: [TrackController],
    providers: [TrackService, FileService]
})

export class TrackModule { }