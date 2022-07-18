import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBasicAuth,
  ApiQuery,
} from "@nestjs/swagger";
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  Req,
  Request,
  CacheInterceptor,
  Query,
} from "@nestjs/common";

import { NotificationService } from "src/adapters/sunbirdrc/notification.adapter";
import { NotificationSearchDto } from "./dto/notification-search.dto";

@ApiTags("Schedule Notification")
@Controller("scheduleNotification")
export class scheduleNotificationController {
  constructor(private service: NotificationService) {}

  @Post("scheduledSend")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Notification has been sent successfully.",
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "module" })
  @ApiQuery({ name: "eventTrigger" })
  @ApiQuery({ name: "templateId" })
  @ApiQuery({ name: "senderId" })
  @ApiQuery({ name: "groupId" })
  @ApiQuery({ name: "channel" })
  @ApiQuery({ name: "month" })
  @ApiQuery({ name: "date" })
  @ApiQuery({ name: "hours" })
  @ApiQuery({ name: "minutes" })
  @ApiQuery({ name: "taskName" })
  public async scheduledSendNotification(
    @Query("module") module: string,
    @Query("eventTrigger") eventTrigger: string,
    @Query("templateId") templateId: string,
    @Query("senderId") senderId: string,
    @Query("groupId") groupId: string,
    @Query("channel") channel: string,
    @Query("month") month: string,
    @Query("date") date: string,
    @Query("hours") hours: string,
    @Query("minutes") minutes: string,
    @Query("taskName") taskName: string,
    @Req() request: Request
  ) {
    return this.service.scheduleSendNotification(
      module,
      eventTrigger,
      templateId,
      senderId,
      groupId,
      channel,
      month,
      date,
      hours,
      minutes,
      taskName,
      request
    );
  }

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Notification Log detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getNotification(
    @Param("id") id: string,
    @Req() request: Request
  ) {
    return this.service.getScheduleNotification(id, request);
  }

  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Notification log list." })
  @ApiBody({ type: NotificationSearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async searchStudent(
    @Req() request: Request,
    @Body() notificationSearchDto: NotificationSearchDto
  ) {
    return await this.service.searchSchedulehNotification(
      request,
      notificationSearchDto
    );
  }
}
