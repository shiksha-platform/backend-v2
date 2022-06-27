import { CacheModule, Module } from "@nestjs/common";
import { AttendanceController } from "./attendance.controller";
import {
  AttendanceService,
  SunbirdAttendanceToken,
} from "../adapters/sunbirdrc/attendance.adapter";
import { HttpModule } from "@nestjs/axios";
import { ScheduleModule } from "@nestjs/schedule";
import {
  AttendanceEsamwadService,
  EsamwadAttendanceToken,
} from "src/adapters/esamwad/attendance.adapter";

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
  providers: [
    AttendanceService,
    AttendanceEsamwadService,
    { provide: SunbirdAttendanceToken, useClass: AttendanceService },
    { provide: EsamwadAttendanceToken, useClass: AttendanceEsamwadService },
  ],
})
export class AttendanceModule {}
