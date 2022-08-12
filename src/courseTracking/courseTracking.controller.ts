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
  Put,
} from "@nestjs/common";
import { CourseTrackingService } from "src/adapters/hasura/courseTracking.adapter";
import { CourseTrackingDto } from "./dto/courseTracking.dto";

@ApiTags("Course Tracking")
@Controller("coursetracking")
export class CourseTrackingController {
  constructor(private service: CourseTrackingService) {}

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Course Tracking has been created successfully.",
  })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiQuery({ name: "progressDetail", required: false })
  @ApiQuery({ name: "courseId", required: false })
  @ApiQuery({ name: "userId", required: false })
  @ApiQuery({ name: "contentIds", required: false })
  @ApiQuery({ name: "startTime", required: false })
  @ApiQuery({ name: "endTime", required: false })
  @ApiQuery({ name: "certificate", required: false })
  @ApiQuery({ name: "status", required: false })
  @ApiQuery({ name: "source", required: false })
  public async createCourse(
    @Req() request: Request,
    @Query("progressDetail") progressDetail: string,
    @Query("courseId") courseId: string,
    @Query("userId") userId: string,
    @Query("contentIds") contentIds: string,
    @Query("startTime") startTime: string,
    @Query("endTime") endTime: string,
    @Query("certificate") certificate: string,
    @Query("status") status: string,
    @Query("source") source: string
  ) {
    return this.service.createCourseTracking(
      request,
      progressDetail,
      courseId,
      userId,
      contentIds,
      startTime,
      endTime,
      certificate,
      status,
      source
    );
  }

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Course Tracking detail" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getCourseTracking(
    @Param("id") courseTrackingId: string,
    @Req() request: Request
  ) {
    return this.service.getCourseTracking(courseTrackingId, request);
  }

  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Course Tracking has been updated successfully.",
  })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiQuery({ name: "progressDetail", required: false })
  @ApiQuery({ name: "courseId", required: false })
  @ApiQuery({ name: "userId", required: false })
  @ApiQuery({ name: "contentIds", required: false })
  @ApiQuery({ name: "startTime", required: false })
  @ApiQuery({ name: "endTime", required: false })
  @ApiQuery({ name: "certificate", required: false })
  @ApiQuery({ name: "status", required: false })
  @ApiQuery({ name: "source", required: false })
  public async updateTracking(
    @Param("id") courseTrackingId: string,
    @Req() request: Request,
    @Query("progressDetail") progressDetail: string,
    @Query("courseId") courseId: string,
    @Query("userId") userId: string,
    @Query("contentIds") contentIds: string,
    @Query("startTime") startTime: string,
    @Query("endTime") endTime: string,
    @Query("certificate") certificate: string,
    @Query("status") status: string,
    @Query("source") source: string
  ) {
    return await this.service.updateCourseTracking(
      request,
      courseTrackingId,
      progressDetail,
      courseId,
      userId,
      contentIds,
      startTime,
      endTime,
      certificate,
      status,
      source
    );
  }

  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Course Tracking list." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  @ApiQuery({ name: "limit", required: false })
  @ApiQuery({ name: "courseId", required: false })
  @ApiQuery({ name: "userId", required: false })
  @ApiQuery({ name: "status", required: false })
  @ApiQuery({ name: "page", required: false })
  @ApiQuery({ name: "source", required: false })
  public async searchCourseTracking(
    @Query("limit") limit: string,
    @Query("courseId") courseId: string,
    @Query("userId") userId: string,
    @Query("status") status: string,
    @Query("page") page: number,
    @Query("source") source: string,
    @Req() request: Request
  ) {
    return await this.service.searchCourseTracking(
      limit,
      courseId,
      userId,
      status,
      page,
      source,
      request
    );
  }
}
