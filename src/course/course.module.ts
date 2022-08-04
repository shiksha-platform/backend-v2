import { CacheModule, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";

import { CourseController } from "./course.controller";
import {
  DikshaCourseService,
  DikshaCourseToken,
} from "src/adapters/diksha/dikshaCourse.adapter";
import {
  KhanAcademyCourseToken,
  KhanAcadermyCourseService,
} from "src/adapters/khanAcademy/khanAcademyCourse.adapter";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [CourseController],
  providers: [
    { provide: DikshaCourseToken, useClass: DikshaCourseService },
    {
      provide: KhanAcademyCourseToken,
      useClass: KhanAcadermyCourseService,
    },
  ],
})
export class CourseModule {}
