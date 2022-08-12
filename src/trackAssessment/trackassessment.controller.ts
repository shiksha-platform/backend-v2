import {
  ApiTags,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBasicAuth,
  ApiBody,
  ApiQuery,
  ApiOkResponse,
} from "@nestjs/swagger";
import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  Req,
  Request,
  CacheInterceptor,
  Post,
  Body,
  Query,
} from "@nestjs/common";
import { TrackAssessmentService } from "src/adapters/hasura/trackassessment.adapter";
import { TrackAssessmentDto } from "./dto/trackassessment.dto";

@ApiTags("Track Assessment")
@Controller("trackassessment")
export class AssessmentController {
  constructor(private service: TrackAssessmentService) {}

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Track Assessment has been created successfully.",
  })
  @ApiBody({ type: TrackAssessmentDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createAssessment(
    @Req() request: Request,
    @Body() assessmentDto: TrackAssessmentDto
  ) {
    return this.service.createAssessment(request, assessmentDto);
  }

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Track Assessment detail" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getAssessment(
    @Param("id") assessmentId: string,
    @Req() request: Request
  ) {
    return this.service.getAssessment(assessmentId, request);
  }

  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Track Assessment list." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  @ApiQuery({ name: "limit", required: false })
  @ApiQuery({ name: "source", required: false })
  @ApiQuery({ name: "studentId", required: false })
  @ApiQuery({ name: "teacherId", required: false })
  @ApiQuery({ name: "groupId", required: false })
  @ApiQuery({ name: "subject", required: false })
  public async searchAssessment(
    @Query("limit") limit: string,
    @Query("source") source: string,
    @Query("studentId") studentId: string,
    @Query("teacherId") teacherId: string,
    @Query("groupId") groupId: string,
    @Query("subject") subject: string,
    @Req() request: Request
  ) {
    return await this.service.searchAssessment(
      limit,
      source,
      studentId,
      teacherId,
      groupId,
      subject,
      request
    );
  }

  @Get("")
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: " Ok." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "fromDate", required: false })
  @ApiQuery({ name: "toDate", required: false })
  @ApiQuery({ name: "groupId", required: false })
  @ApiQuery({ name: "subject", required: false })
  public async trackassessmentFilter(
    @Query("fromDate") date: string,
    @Query("toDate") toDate: string,
    @Query("groupId") groupId: string,
    @Query("subject") subject: string,
    @Req() request: Request
  ) {
    return this.service.trackAssessmentFilter(
      date,
      toDate,
      groupId,
      subject,
      request
    );
  }
}
