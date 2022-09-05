import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { AttendanceEsamwadService } from "./attendance.adapter";
import { EsamwadGroupService } from "./group.adapter";
import { EsamwadSchoolService } from "./school.adapter";
import { EsamwadStudentService } from "./student.adapter";
import { EsamwadUserService } from "./user.adapter";

@Module({
  imports: [HttpModule],
  providers: [
    AttendanceEsamwadService,
    EsamwadStudentService,
    EsamwadUserService,
    EsamwadSchoolService,
    EsamwadGroupService,
  ],
  exports: [
    AttendanceEsamwadService,
    EsamwadStudentService,
    EsamwadUserService,
    EsamwadSchoolService,
    EsamwadGroupService,
  ],
})
export class EsmwadModule {}
