import { CacheModule, Module } from "@nestjs/common";
import { TeacherController } from "./teacher.controller";
import {
  SunbirdTeacherToken,
  TeacherService,
} from "../adapters/sunbirdrc/teacher.adapter";
import { HttpModule } from "@nestjs/axios";
import {
  EsamwadTeacherService,
  EsamwadTeacherToken,
} from "src/adapters/esamwad/teacher.adapter";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [TeacherController],
  providers: [
    TeacherService,
    EsamwadTeacherService,
    { provide: SunbirdTeacherToken, useClass: TeacherService },
    { provide: EsamwadTeacherToken, useClass: EsamwadTeacherService },
  ],
})
export class TeacherModule {}
