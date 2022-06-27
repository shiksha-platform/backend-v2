import { CacheModule, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { NotificationService } from "src/adapters/sunbirdrc/notification.adapter";
import {  NotificationController} from "./instantNotification.controller";
import {notificationController} from "./scheduleNotification.controller"
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [NotificationController,notificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
