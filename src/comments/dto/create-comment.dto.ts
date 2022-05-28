import mongoose from "mongoose"

export class CreateCommentDto {
    readonly text: string;
    readonly trackId: mongoose.Types.ObjectId;
}