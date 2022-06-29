import { CacheModule, Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import {
  StudentService,
  SunbirdStudentToken,
} from "../adapters/sunbirdrc/student.adapter";
import { HttpModule } from "@nestjs/axios";
import {
  EsamwadStudentService,
  EsamwadStudentToken,
} from "src/adapters/esamwad/student.adapter";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [StudentController],
  providers: [
    StudentService,
    EsamwadStudentService,
    { provide: SunbirdStudentToken, useClass: StudentService },
    { provide: EsamwadStudentToken, useClass: EsamwadStudentService },
  ],
})
export class StudentModule {}
