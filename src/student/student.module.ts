import { Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { StudentService } from "../adapters/default/student.adapter";
import { HttpModule } from "@nestjs/axios";
@Module({
  imports: [HttpModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
