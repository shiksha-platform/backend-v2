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
import { MonitorTrackingDto } from "./dto/monitorTracking.dto";
import { MonitorTrackingService } from "src/adapters/sunbirdrc/monitorTracking.adapter";

@ApiTags("Monitor Tracking")
@Controller("monitortracking")
export class MonitorTrackingController {
  constructor(private readonly service: MonitorTrackingService) {}

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Monitor Tracking detail." })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  getMonitor(@Param("id") monitorTrackingId: string, @Req() request: Request) {
    return this.service.getMonitorTracking(monitorTrackingId, request);
  }

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Monitor Tracking has been created successfully.",
  })
  @ApiBody({ type: MonitorTrackingDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createMonitor(
    @Req() request: Request,
    @Body() monitorDto: MonitorTrackingDto
  ) {
    return this.service.createMonitorTracking(request, monitorDto);
  }

  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Monitor Tracking has been updated successfully.",
  })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateMonitor(
    @Param("id") monitorTrackingId: string,
    @Req() request: Request,
    @Body() monitorDto: MonitorTrackingDto
  ) {
    return await this.service.updateMonitorTracking(
      monitorTrackingId,
      request,
      monitorDto
    );
  }

  @Post("/search")
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: " Ok." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "limit", required: false })
  @ApiQuery({ name: "monitorTrackingId", required: false })
  @ApiQuery({ name: "monitorId", required: false })
  @ApiQuery({ name: "schoolId", required: false })
  @ApiQuery({ name: "scheduleVisitDate", required: false })
  @ApiQuery({ name: "visitDate", required: false })
  public async searchMonitorTracking(
    @Query("limit") limit: string,
    @Query("monitorTrackingId") monitorTrackingId: string,
    @Query("monitorId") monitorId: string,
    @Query("schoolId") schoolId: string,
    @Query("scheduleVisitDate") scheduleVisitDate: Date,
    @Query("visitDate") visitDate: Date,
    @Req() request: Request
  ) {
    return this.service.searchMonitorTracking(
      limit,
      monitorTrackingId,
      monitorId,
      schoolId,
      scheduleVisitDate,
      visitDate,
      request
    );
  }
}
