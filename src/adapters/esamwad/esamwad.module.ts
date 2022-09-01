import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { AttendanceEsamwadService } from "./attendance.adapter";

@Module({
    imports: [HttpModule],
    providers: [AttendanceEsamwadService],
    exports: [AttendanceEsamwadService]
})
export class EsmwadModule { }