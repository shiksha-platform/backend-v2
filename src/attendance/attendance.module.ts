import { CacheModule, Module } from "@nestjs/common";
import { AttendanceController } from "./attendance.controller";
import { AttendanceService } from "../adapters/sunbirdrc/attendance.adapter";
import { HttpModule } from "@nestjs/axios";
import { ScheduleModule } from "@nestjs/schedule";
import { AttendanceHasuraService } from "src/adapters/hasura/attendance.adapter";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService, AttendanceHasuraService],
})
export class AttendanceModule {}
