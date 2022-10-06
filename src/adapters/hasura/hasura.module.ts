import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { HasuraAdminFormService } from "./adminForm.adapter";
import { AttendanceHasuraService } from "./attendance.adapter";
import { HasuraCommentService } from "./comment.adapter";
import { HasuraConfigService } from "./config.adapter";
import { HasuraGroupService } from "./group.adapter";
import { HasuraHolidayService } from "./holiday.adapter";
import { HasuraLikeService } from "./like.adapter";
import { SchoolHasuraService } from "./school.adapter";
import { HasuraStudentService } from "./student.adapter";

@Module({
  imports: [HttpModule],
  providers: [
    AttendanceHasuraService,
    SchoolHasuraService,
    HasuraGroupService,
    HasuraCommentService,
    HasuraConfigService,
    HasuraLikeService,
    HasuraHolidayService,
    HasuraAdminFormService,
    HasuraStudentService,
  ],
  exports: [
    AttendanceHasuraService,
    SchoolHasuraService,
    HasuraGroupService,
    HasuraCommentService,
    HasuraConfigService,
    HasuraLikeService,
    HasuraHolidayService,
    HasuraAdminFormService,
    HasuraStudentService,
  ],
})
export class HasuraModule {}
