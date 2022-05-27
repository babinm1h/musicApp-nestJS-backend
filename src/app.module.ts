import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/user.module';
import { AuthorModule } from './author/author.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';


@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, "", "static"),
            serveStaticOptions: { index: false }
        }),
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DB_URI),
        TrackModule,
        AuthorModule,
        FileModule,
        UsersModule,
        AuthModule
    ]
})


export class AppModule { }
