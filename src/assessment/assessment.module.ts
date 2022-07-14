import { CacheModule, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ScheduleModule } from "@nestjs/schedule";
import { AssessmentService } from "src/adapters/sunbirdrc/assessment.adapter";
import { AssessmentController } from "./assessment.controller";
import { AssessmentsetController } from "./assessmentset.controller";
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
  providers: [AssessmentService],
})
export class AssessmentModule {}
