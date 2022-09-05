import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { AttendanceService } from "./attendance.adapter";
import { SunbirdCommentService } from "./comment.adapter";
import { SunbirdConfigService } from "./config.adapter";
import { SunbirdGroupService } from "./group.adapter";
import { SunbirdHolidayService } from "./holiday.adapter";
import { SunbirdLikeService } from "./like.adapter";
import { SchoolService } from "./school.adapter";
import { StudentService } from "./student.adapter";
import { UserService } from "./user.adapter";

@Module({
  imports: [HttpModule],
  providers: [
    AttendanceService,
    StudentService,
    UserService,
    SchoolService,
    SunbirdGroupService,
    SunbirdCommentService,
    SunbirdConfigService,
    SunbirdLikeService,
    SunbirdHolidayService,
  ],
  exports: [
    AttendanceService,
    StudentService,
    UserService,
    SchoolService,
    SunbirdGroupService,
    SunbirdCommentService,
    SunbirdConfigService,
    SunbirdLikeService,
    SunbirdHolidayService,
  ],
})
export class SunbirdModule {}
