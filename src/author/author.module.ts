import { Module } from "@nestjs/common";
import { AuthorController } from "./author.controller";
import { AuthorService } from "./author.service";
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from "./author.schema";
import { Track, TrackSchema } from "src/track/track.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
        MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }])
    ],
    providers: [AuthorService],
    controllers: [AuthorController]
})


export class AuthorModule {

}