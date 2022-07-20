import { CacheModule, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ScheduleModule } from "@nestjs/schedule";
import { AssessmentService } from "src/adapters/sunbirdrc/trackassessment.adapter";
import { AssessmentController } from "./trackassessment.controller";
import { AssessmentsetController } from "../assessmentset/assessmentset.controller";
import { AssessmentsetService } from "src/adapters/sunbirdrc/assessmentset.adapter";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AssessmentController, AssessmentsetController],
  providers: [AssessmentService, AssessmentsetService],
})
export class AssessmentModule {}
