import { CacheModule, Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { StudentService } from "../adapters/sunbirdrc/student.adapter";
import { HttpModule } from "@nestjs/axios";
import { EsamwadStudentService } from "src/adapters/esamwad/student.adapter";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [StudentController],
  providers: [StudentService, EsamwadStudentService],
})
export class StudentModule {}
