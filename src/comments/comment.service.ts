import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose"
import mongoose, { Model } from "mongoose"
import { Track, TrackDocument } from "src/track/track.schema";
import { Comment, CommentDocument } from "./comment.schema";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { User, UserDocument } from "../users/user.schema"

@Injectable()

export class CommentService {
    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }


    async createComment(dto: CreateCommentDto, userId: mongoose.Types.ObjectId): Promise<Comment> {
        let comment = await this.commentModel.create({
            user: userId, text: dto.text, track: dto.trackId
        })
        comment = await comment.populate("user")

        const trackId = new mongoose.Types.ObjectId(dto.trackId)
        console.log(trackId);


        const track = await this.trackModel.findById(trackId)
        track.comments.push(comment._id)
        await track.save()


        await this.userModel.findByIdAndUpdate(userId, {
            $push: { comments: comment._id }
        }, { new: true })


        return comment
    }
}
