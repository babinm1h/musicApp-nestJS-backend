import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Comment } from 'src/comments/comment.schema';
import mongoose from "mongoose"
import { Author } from 'src/author/author.schema';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
    @Prop({ required: true })
    name: string

    @Prop()
    img: string

    @Prop()
    text: string

    @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: "Comment" }] })
    comments: Comment[]

    @Prop({ default: 0 })
    listens: number

    @Prop({ type: mongoose.Types.ObjectId, ref: "Author", required: true })
    author: Author

    @Prop()
    audio: string
}

export const TrackSchema = SchemaFactory.createForClass(Track)