import { Body, CacheInterceptor, ClassSerializerInterceptor, Controller, Delete, Get, Inject, Param, Post, Put, Query, Req, Request, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBasicAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse } from '@nestjs/swagger';
import { IServicelocator } from 'src/adapters/announcementsservicelocator';
import { AnnouncementsEsamwadService, ESamwadAnnouncementsToken } from 'src/adapters/esamwad/announcements.adapter';
import { AnnouncementsDto } from './dto/announcements.dto';

@Controller('announcements')
export class AnnouncementsController {
    constructor(
        private hasuraService: AnnouncementsEsamwadService,
        @Inject(ESamwadAnnouncementsToken) private eSamwadProvider: IServicelocator
    ) { }

    @Get("/:id")
    @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
    @ApiBasicAuth("access-token")
    @ApiCreatedResponse({ description: "Get announcement detail" })
    @ApiForbiddenResponse({ description: "Forbidden" })
    public async getAnnouncement(
        @Param("id") announcementId: string,
        @Req() request: Request
    ) {
        return this.eSamwadProvider.getAnnouncement(announcementId, request);
    }


    @Get("")
    @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
    @ApiBasicAuth("access-token")
    @ApiCreatedResponse({ description: "Get announcements" })
    @ApiForbiddenResponse({ description: "Forbidden" })
    public async getAnnouncementSet(
        @Query() query: any,
        @Req() request: Request
    ) {
        return this.eSamwadProvider.getAnnouncementSet(request, parseInt(query.pageIndex), parseInt(query.pageSize));
    }


    @Put("/:id")
    @ApiConsumes("multipart/form-data")
    @ApiBasicAuth("access-token")
    @ApiCreatedResponse({
        description: "Announcement has been Updated successfully.",
    })
    @ApiBody({ type: AnnouncementsDto })
    @ApiForbiddenResponse({ description: "Forbidden" })
    @UseInterceptors(ClassSerializerInterceptor)
    public async updateAnnouncement(
        @Param("id") announcementId: string,
        @Req() request: Request,
        @Body() announcementData: AnnouncementsDto,
    ) {
        announcementData.pinnedAnnouncementProperties = JSON.parse(announcementData.pinnedAnnouncementProperties);
        return this.eSamwadProvider.updateAnnouncement(
            announcementId,
            request,
            announcementData
        );
    }

    @Post()
    @ApiConsumes("multipart/form-data")
    @ApiBasicAuth("access-token")
    @ApiCreatedResponse({
        description: "Announcement has been created successfully.",
    })
    @ApiBody({ type: AnnouncementsDto })
    @ApiForbiddenResponse({ description: "Forbidden" })
    public async createAnnouncement(
        @Req() request: Request,
        @Body() announcementData: any,
    ) {
        if (announcementData?.pinnedAnnouncementProperties)
            announcementData.pinnedAnnouncementProperties = JSON.parse(announcementData?.pinnedAnnouncementProperties);
        return this.eSamwadProvider.createAnnouncement(request, announcementData);
    }

    @Delete("/:id")
    @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
    @ApiBasicAuth("access-token")
    @ApiOkResponse({ description: "Deleted the announcement " })
    public async deleteAnnouncement(
        @Param("id") announcementId: string,
        @Req() request: Request
    ) {
        return this.eSamwadProvider.deleteAnnouncement(announcementId, request);
    }
}

