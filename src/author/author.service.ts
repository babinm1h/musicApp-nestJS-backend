import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Author, AuthorDocument } from "./author.schema";
import mongoose, { Model } from 'mongoose';
import { Track, TrackDocument } from "src/track/track.schema";

@Injectable()

export class AuthorService {

    constructor(
        @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>
    ) { }

    async create(name: string): Promise<Author> {
        const author = await this.authorModel.create({ name })
        return author
    }


    async getOne(id: mongoose.Types.ObjectId): Promise<Author> {
        let author = await (await this.authorModel.findById(id)).populate("tracks") as any
        author = await this.trackModel.populate(author, { path: "tracks.author" })
        if (!author) throw new NotFoundException("Author not found")

        return author
    }

    async getAll(): Promise<Author[]> {
        const authors = await this.authorModel.find()
        return authors
    }
}