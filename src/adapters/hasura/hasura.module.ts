import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { AttendanceHasuraService } from "./attendance.adapter";

@Module({
  imports: [HttpModule],
  providers: [AttendanceHasuraService],
  exports: [AttendanceHasuraService],
})
export class HasuraModule {}
