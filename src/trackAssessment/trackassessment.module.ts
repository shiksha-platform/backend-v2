import { CacheModule, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ScheduleModule } from "@nestjs/schedule";
import { TrackAssessmentService } from "src/adapters/hasura/trackassessment.adapter";
import { AssessmentController } from "./trackassessment.controller";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AssessmentController],
  providers: [TrackAssessmentService],
})
export class TrackAssessmentModule {}
