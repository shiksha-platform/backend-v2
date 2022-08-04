import { HttpModule } from "@nestjs/axios";
import { CacheModule, Module } from "@nestjs/common";
import { MentorTrackingService } from "src/adapters/hasura/mentorTracking.adapter";
import { MentorTrackingController } from "./mentorTracking.controller";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [MentorTrackingController],
  providers: [MentorTrackingService],
})
export class MentorTrackingModule {}
