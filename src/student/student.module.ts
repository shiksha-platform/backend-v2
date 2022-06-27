import { CacheModule, Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { StudentService } from "../adapters/sunbirdrc/student.adapter";
import { HttpModule } from "@nestjs/axios";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
