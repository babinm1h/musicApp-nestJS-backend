import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Track } from 'src/track/track.schema';
import { User } from 'src/users/user.schema';
import mongoose from "mongoose"

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
    @Prop()
    text: string

    @Prop({ type: mongoose.Types.ObjectId, ref: "User" })
    user: User

    @Prop({ type: mongoose.Types.ObjectId, ref: "Track" })
    track: Track
}

export const CommentSchema = SchemaFactory.createForClass(Comment)