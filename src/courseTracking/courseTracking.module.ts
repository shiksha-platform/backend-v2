import { CacheModule, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ScheduleModule } from "@nestjs/schedule";
import { CourseTrackingService } from "src/adapters/hasura/courseTracking.adapter";
import { CourseTrackingController } from "./courseTracking.controller";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [CourseTrackingController],
  providers: [CourseTrackingService],
})
export class CourseTrackingModule {}
