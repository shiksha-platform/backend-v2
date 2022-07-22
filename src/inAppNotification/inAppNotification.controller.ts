import {
  ApiTags,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBasicAuth,
  ApiQuery,
} from "@nestjs/swagger";
import {
  Controller,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  Request,
  Query,
  Get,
} from "@nestjs/common";
import { InAppNotificationService } from "src/adapters/sunbirdrc/inAppNotification.adapter";

@ApiTags("In App Notification")
@Controller("inappnotification")
export class InAppNotificationController {
  constructor(private service: InAppNotificationService) {}

  @Get("/userhistory")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "User Notification History.",
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "userId" })
  @ApiQuery({ name: "provider" })
  @ApiQuery({ name: "startDate" })
  @ApiQuery({ name: "endDate" })
  public async userHistoryNotification(
    @Query("userId") userId: string,
    @Query("provider") provider: string,
    @Query("startDate") startDate: string,
    @Query("endDate") endDate: string,
    @Req() request: Request
  ) {
    return this.service.userHistoryNotification(
      userId,
      provider,
      startDate,
      endDate,
      request
    );
  }

  @Get("/bothistory")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Bot Notification History.",
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "botId" })
  @ApiQuery({ name: "provider" })
  @ApiQuery({ name: "startDate" })
  @ApiQuery({ name: "endDate" })
  public async botHistoryNotification(
    @Query("botId") botId: string,
    @Query("provider") provider: string,
    @Query("startDate") startDate: string,
    @Query("endDate") endDate: string,
    @Req() request: Request
  ) {
    return this.service.botHistoryNotification(
      botId,
      provider,
      startDate,
      endDate,
      request
    );
  }
}
