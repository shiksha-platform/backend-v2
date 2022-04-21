import { CacheModule, Module } from "@nestjs/common";
import { AttendanceController } from "./attendance.controller";
import { AttendanceService } from "../adapters/default/attendance.adapter";
import { HttpModule } from "@nestjs/axios";
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: 900,
    }),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
