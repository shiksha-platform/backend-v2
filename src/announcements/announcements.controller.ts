import {
  Body,
  CacheInterceptor,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
  Request,
  SerializeOptions,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBasicAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { IServicelocator } from "src/adapters/announcementsservicelocator";
import {
  AnnouncementsEsamwadService,
  ESamwadAnnouncementsToken,
} from "src/adapters/esamwad/announcements.adapter";
import { AnnouncementsFilterDto } from "./dto/announcements-filter.dto";
import { AnnouncementsDto } from "./dto/announcements.dto";

@Controller("announcements")
export class AnnouncementsController {
  constructor(
    private hasuraService: AnnouncementsEsamwadService,
    @Inject(ESamwadAnnouncementsToken) private eSamwadProvider: IServicelocator
  ) {}

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
    @Query() query: AnnouncementsFilterDto,
    @Req() request: Request
  ) {
    return this.eSamwadProvider.getAnnouncementSet(request, query);
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
    @Body() announcementData: any
  ) {
    const updatedData = JSON.parse(announcementData?.data);
    return this.eSamwadProvider.updateAnnouncement(
      announcementId,
      request,
      updatedData
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
    @Body() announcementData: AnnouncementsDto
  ) {
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
