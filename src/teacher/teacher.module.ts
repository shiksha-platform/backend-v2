import { CacheModule, Module } from "@nestjs/common";
import { TeacherController } from "./teacher.controller";
import { TeacherService } from "../adapters/sunbirdrc/teacher.adapter";
import { HttpModule } from "@nestjs/axios";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
