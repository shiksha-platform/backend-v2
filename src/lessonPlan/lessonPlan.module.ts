import { HttpModule } from "@nestjs/axios";
import { CacheModule, Module } from "@nestjs/common";
import { LessonPlanController } from "./lessonPlan.controller";
import { LessonPlanService } from "src/adapters/sunbirdrc/lessonPlan.adapter";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [LessonPlanController],
  providers: [LessonPlanService],
})
export class LessonPlanModule {}
