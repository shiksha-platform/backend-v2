import { CacheModule, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { NotificationService } from "src/adapters/sunbirdrc/notification.adapter";
import { instantNotificationController } from "./instantNotification.controller";
import { scheduleNotificationController } from "./scheduleNotification.controller";
import { ScheduleModule } from "@nestjs/schedule";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [instantNotificationController, scheduleNotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
