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

import { NotificationService } from "src/adapters/default/notification.adapter";
import { NotificationSearchDto } from "./dto/notification-search.dto";
@ApiTags("Notification")
@Controller("notification")
export class NotificationController {
  constructor(private service: NotificationService) {}

  @Post("send")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Notification has been sent successfully.",
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "title" })
  @ApiQuery({ name: "templateId" })
  @ApiQuery({ name: "groupId" })
  @ApiQuery({ name: "channel" })
  @ApiQuery({ name: "hours", required: false })
  @ApiQuery({ name: "minutes", required: false })
  @ApiQuery({ name: "taskName", required: false })
  public async tamplate(
    @Query("title") title: string,
    @Query("templateId") templateId: string,
    @Query("groupId") groupId: string,
    @Query("channel") channel: string,
    @Query("hours") hours: string,
    @Query("minutes") minutes: string,
    @Query("taskName") taskName: string,
    @Req() request: Request
  ) {
    return this.service.sendNotification(
      title,
      templateId,
      groupId,
      channel,
      hours,
      minutes,
      taskName,
      request
    );
  }

  @Get("log/:id")
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
    return this.service.getNotification(id, request);
  }

  @Post("log/search")
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
    return await this.service.searchNotification(
      request,
      notificationSearchDto
    );
  }
}
