import { CacheModule, Module } from "@nestjs/common";
import { AttendanceController } from "./attendance.controller";
import { HttpModule } from "@nestjs/axios";
import { ScheduleModule } from "@nestjs/schedule";
import {
  AttendanceEsamwadService,
  EsamwadAttendanceToken,
} from "src/adapters/esamwad/attendance.adapter";
import {
  AttendanceHasuraService,
  ShikshaAttendanceToken,
} from "src/adapters/hasura/attendance.adapter";
import {
  AttendanceService,
  SunbirdAttendanceToken,
} from "src/adapters/sunbirdrc/attendance.adapter";

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
    AttendanceHasuraService,
    AttendanceEsamwadService,
    { provide: ShikshaAttendanceToken, useClass: AttendanceHasuraService },
    { provide: SunbirdAttendanceToken, useClass: AttendanceService },
    { provide: EsamwadAttendanceToken, useClass: AttendanceEsamwadService },
  ],
})
export class AttendanceModule {}
