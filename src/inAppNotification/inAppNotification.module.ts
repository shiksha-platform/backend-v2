import { CacheModule, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ScheduleModule } from "@nestjs/schedule";
import { InAppNotificationController } from "./inAppNotification.controller";
import { InAppNotificationService } from "src/adapters/sunbirdrc/inAppNotification.adapter";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [InAppNotificationController],
  providers: [InAppNotificationService],
})
export class InAppNotificationModule {}
