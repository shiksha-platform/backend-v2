import { CacheModule, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ScheduleModule } from "@nestjs/schedule";
import { AssessmentsetController } from "./assessmentset.controller";
import { AssessmentsetService } from "src/adapters/hasura/assessmentset.adapter";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AssessmentsetController],
  providers: [AssessmentsetService],
})
export class AssessmentSetModule {}
