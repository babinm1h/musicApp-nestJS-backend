import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from 'src/track/track.schema';
import { User, UserSchema } from 'src/users/user.schema';
import { CommentController } from './comment.controller';
import { Comment, CommentSchema } from './comment.schema';
import { CommentService } from './comment.service';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }])
    ],

    providers: [CommentService],
    controllers: [CommentController]
})


export class CommentModule {

}