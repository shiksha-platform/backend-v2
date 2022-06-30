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
@ApiTags("Instant Notification")
@Controller("instantNotification")
export class instantNotificationController {
  constructor(private service: NotificationService) {}

  @Post("instantSend")
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
  public async instantSendNotification(
    @Query("module") module: string,
    @Query("eventTrigger") eventTrigger: string,
    @Query("templateId") templateId: string,
    @Query("senderId") senderId: string,
    @Query("groupId") groupId: string,
    @Query("channel") channel: string,
    @Req() request: Request
  ) {
    return this.service.instantSendNotification(
      module,
      eventTrigger,
      templateId,
      senderId,
      groupId,
      channel,
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
