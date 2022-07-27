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
} from "@nestjs/common";
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBasicAuth,
  ApiQuery,
} from "@nestjs/swagger";
import { Request } from "@nestjs/common";
import { MentorTrackingService } from "src/adapters/sunbirdrc/mentorTracking.adapter";
import { MentorTrackingDto } from "./dto/mentorTracking.dto";

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
  public async updateMentor(
    @Param("id") mentorId: string,
    @Req() request: Request,
    @Body() mentorDto: MentorTrackingDto
  ) {
    return await this.service.updateMentorTracking(
      mentorId,
      request,
      mentorDto
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
  public async studentAttendanceByGroup(
    @Query("limit") limit: string,
    @Query("mentorTrackingId") mentorTrackingId: string,
    @Query("mentorId") mentorId: string,
    @Query("teacherId") teacherId: string,
    @Req() request: Request
  ) {
    return this.service.searchMentorTracking(
      limit,
      mentorTrackingId,
      mentorId,
      teacherId,
      request
    );
  }
}
