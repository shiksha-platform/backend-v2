import { Module } from "@nestjs/common";
import { SchoolController } from "./school.controller";
import { SchoolService } from "./school.service";
import { HttpModule } from "@nestjs/axios";
@Module({
  imports: [HttpModule],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
