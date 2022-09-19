import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  Req,
  CacheInterceptor,
  Query,
  ValidationPipe,
  UsePipes,
  Header,
  UploadedFile,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBasicAuth,
  ApiQuery,
  ApiConsumes,
} from "@nestjs/swagger";
import { Request } from "@nestjs/common";
import { MentorTrackingDto } from "./dto/mentorTracking.dto";
import { MentorTrackingService } from "src/adapters/hasura/mentorTracking.adapter";
import { FileInterceptor } from "@nestjs/platform-express";
import { editFileName, imageFileFilter } from "./utils/file-upload.utils";
import { diskStorage } from "multer";
import { FeedbackCreateDto } from "./dto/feedback-create.dto";
@ApiTags("Mentor Tracking")
@Controller("mentortracking")
export class MentorTrackingController {
  constructor(private readonly service: MentorTrackingService) {}

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Mentor Tracking detail." })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  getMentor(@Param("id") mentorId: string, @Req() request: Request) {
    return this.service.getMentorTracking(mentorId, request);
  }

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Mentor Tracking has been created successfully.",
  })
  @ApiBody({ type: MentorTrackingDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({}))
  public async createMentor(
    @Req() request: Request,
    @Body() mentorDto: MentorTrackingDto
  ) {
    return this.service.createMentorTracking(request, mentorDto);
  }

  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Mentor Tracking has been updated successfully.",
  })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({}))
  public async updateMentor(
    @Param("id") mentorTrackingId: string,
    @Req() request: Request,
    @Body() mentorTrackingDto: MentorTrackingDto
  ) {
    return await this.service.updateMentorTracking(
      mentorTrackingId,
      request,
      mentorTrackingDto
    );
  }

  @Put("feedback/:id")
  @ApiConsumes("multipart/form-data")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Group has been updated successfully." })
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: process.env.IMAGEPATH,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  @ApiBody({ type: FeedbackCreateDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async feedback(
    @Param("id") mentorTrackingId: string,
    @Req() request: Request,
    @Body() feedbackCreateDto: FeedbackCreateDto,
    @UploadedFile() image
  ) {
    const response = {
      image: image?.filename,
    };
    Object.assign(feedbackCreateDto, response);

    return await this.service.feedback(
      mentorTrackingId,
      feedbackCreateDto,
      request
    );
  }

  @Post("/search")
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: " Ok." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "limit", required: false })
  @ApiQuery({ name: "mentorTrackingId", required: false })
  @ApiQuery({ name: "mentorId", required: false })
  @ApiQuery({ name: "teacherId", required: false })
  @ApiQuery({ name: "schoolId", required: false })
  @ApiQuery({ name: "scheduleVisitDate", required: false })
  @ApiQuery({ name: "visitDate", required: false })
  @ApiQuery({ name: "page", required: false })
  @ApiQuery({ name: "status", required: false })
  public async searchMentorTracking(
    @Query("limit") limit: string,
    @Query("mentorTrackingId") mentorTrackingId: string,
    @Query("mentorId") mentorId: string,
    @Query("teacherId") teacherId: string,
    @Query("schoolId") schoolId: string,
    @Query("scheduleVisitDate") scheduleVisitDate: Date,
    @Query("visitDate") visitDate: Date,
    @Query("page") page: number,
    @Query("status") status: string,
    @Req() request: Request
  ) {
    return this.service.searchMentorTracking(
      limit,
      mentorTrackingId,
      mentorId,
      teacherId,
      schoolId,
      scheduleVisitDate,
      visitDate,
      page,
      status,
      request
    );
  }
}
