import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Track } from 'src/track/track.schema';

export type AuthorDocument = Author & Document;

@Schema()
export class Author {

    @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: "Track" }] })
    tracks: Track[]

    @Prop({ default: 'https://dpclinic.ru/upload/iblock/6ce/6ce2d48158f804ec94c075513884abcf.jpg' })
    img: string

    @Prop({ required: true })
    name: string
}

export const AuthorSchema = SchemaFactory.createForClass(Author)