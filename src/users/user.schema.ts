import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Comment } from 'src/comments/comment.schema';
import mongoose from "mongoose"
import { Track } from 'src/track/track.schema';

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({ required: true })
    email: string


    @Prop({ required: true })
    password: string

    @Prop({ default: 'https://dpclinic.ru/upload/iblock/6ce/6ce2d48158f804ec94c075513884abcf.jpg' })
    img: string


    @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: "Comment" }] })
    comments: Comment[]

    @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: "Track" }] })
    playlist: Track[]
}

export const UserSchema = SchemaFactory.createForClass(User)