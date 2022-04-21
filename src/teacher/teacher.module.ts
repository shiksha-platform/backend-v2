import { CacheModule, Module } from "@nestjs/common";
import { TeacherController } from "./teacher.controller";
import { TeacherService } from "../adapters/default/teacher.adapter";
import { HttpModule } from "@nestjs/axios";
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: 900,
    }),
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
