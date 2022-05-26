import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreateTrackDto } from "./dto/create-track.dto";
import { TrackService } from "./track.service";
import mongoose from "mongoose"


@Controller("/tracks")

export class TrackController {

    constructor(private trackService: TrackService) { }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: "img", maxCount: 1 },
        { name: "audio", maxCount: 1 }
    ]))
    create(@Body() dto: CreateTrackDto, @UploadedFiles() files) {
        const { audio, img } = files;
        return this.trackService.create(dto, img[0], audio[0])
    }

    @Get(":id")
    getOne(@Param("id") id: mongoose.Types.ObjectId) {
        return `this.trackService.getOne(id)`
    }


    @Get("/search")
    search(@Query("query") query: string) {
        return this.trackService.search(query)
    }


    @Get()
    getAll(@Query("limit") limit: number, @Query("page") page: number) {
        page = page || 1
        const offset = page * limit - limit

        return this.trackService.getAll(+limit, offset)
    }


    @Delete(":id")
    delete(@Param("id") id: mongoose.Types.ObjectId) {
        return this.trackService.delete(id)
    }

    @Post("/listen/:id")
    listen(@Param("id") id: mongoose.Types.ObjectId) {
        return this.trackService.listen(id)
    }


}


