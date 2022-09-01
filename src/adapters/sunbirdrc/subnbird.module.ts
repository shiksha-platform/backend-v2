import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { AttendanceService } from "./attendance.adapter";

@Module({
    imports: [HttpModule],
    providers: [AttendanceService],
    exports: [AttendanceService]
})
export class SunbirdModule { }