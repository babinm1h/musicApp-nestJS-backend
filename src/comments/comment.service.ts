import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Track, TrackDocument } from "src/track/track.schema";
import { Comment, CommentDocument } from "./comment.schema";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Injectable()

export class CommentService {
    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
    ) { }


    async createComment(dto: CreateCommentDto): Promise<Comment> {
        const comment = await this.commentModel.create({ ...dto })
        const track = await this.trackModel.findById(dto.track)
        track.comments.push(comment._id)
        await track.save()

        return comment
    }
}
