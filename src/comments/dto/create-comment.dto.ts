import mongoose from "mongoose"

export class CreateCommentDto {
    readonly text: string;
    readonly user: string;
    readonly track: mongoose.Types.ObjectId;
}