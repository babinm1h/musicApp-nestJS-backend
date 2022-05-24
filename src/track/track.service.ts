import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from "./track.schema";
import { Model } from 'mongoose';
import { Author, AuthorDocument } from "src/author/author.schema";
import { CreateTrackDto } from "./dto/create-track.dto";
import { Comment, CommentDocument } from "src/comments/comment.schema";
import { FileService, FileTypes } from "src/file/file.service";
import mongoose from "mongoose"


@Injectable()

export class TrackService {

    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        private fileService: FileService
    ) { }


    async create(dto: CreateTrackDto, img, audio): Promise<Track> {
        const audioPath = this.fileService.createFile(FileTypes.AUDIO, audio)
        const imgPath = this.fileService.createFile(FileTypes.IMG, img)

        const track = await this.trackModel.create({ ...dto, audio: audioPath, img: imgPath })
        await this.authorModel.findByIdAndUpdate(dto.author, { $push: { tracks: track._id } })
        return track
    }


    async getAll(limit = 5, offset = 0) {
        const tracks = await this.trackModel.find().skip(offset).limit(limit).populate("author")
        const allTracks = await this.trackModel.find()
        return { totalCount: allTracks.length, tracks }
    }


    async getOne(id: mongoose.Types.ObjectId): Promise<Track> {
        let track = await this.trackModel.findById(id).populate("comments") as any;
        track = await this.commentModel.populate(track, { path: "comments.user" })
        return track
    }

    async delete(id: mongoose.Types.ObjectId): Promise<string> {
        const track = await this.trackModel.findByIdAndDelete(id)
        return track._id
    }


    async listen(id: mongoose.Types.ObjectId) {
        const track = await this.trackModel.findByIdAndUpdate(id, { $inc: { listens: 1 } })
        if (!track) return
        return true
    }


    async search(query: string) {
        const result = await this.trackModel.find({
            name: { $regex: new RegExp(query, "i") }
        })
        return result
    }

}