import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { StudentModule } from "./student/student.module";
import { TeacherModule } from "./teacher/teacher.module";
import { SchoolModule } from "./school/school.module";
import { AttendanceModule } from "./attendance/attendance.module";
import { GroupModule } from "./group/group.module";
import { HolidayModule } from "./holiday/holiday.module";
import { ConfigurationModule } from "./configs/configuration.module";
import { ConfigModule } from "@nestjs/config";
import { GroupMembershipModule } from "./groupMembership/groupMembership.module";
import { NotificationModule } from "./notification/notification.module";
import { TemplateModule } from "./template/template.module";
import { WorksheetModule } from "./worksheet/worksheet.module";
import { MulterModule } from "@nestjs/platform-express/multer";
import { QuestionModule } from "./Question/question.module";
import { LessonPlanModule } from "./lessonPlan/lessonPlan.module";
import { AdminFormModule } from "./adminForm/adminForm.module";
import { LikeModule } from "./like/like.module";
import { CommentModule } from "./comment/comment.module";
import { TrackAssessmentModule } from "./trackAssessment/trackassessment.module";
import { AssessmentSetModule } from "./assessmentset/assessmentset.module";
import { InAppNotificationModule } from "./inAppNotification/inAppNotification.module";
import { MentorTrackingModule } from "./mentorTracking/mentorTracking.module";
import { MonitorTrackingModule } from "./monitorTracking/monitorTracking.module";
import {
  AttendanceEsamwadService,
  EsamwadAttendanceToken,
} from "./adapters/esamwad/attendance.adapter";
import {
  AnnouncementsEsamwadService,
  ESamwadAnnouncementsToken,
} from "./adapters/esamwad/announcements.adapter";
import {
  SunbirdAttendanceToken,
  AttendanceService,
} from "./adapters/sunbirdrc/attendance.adapter";

import { AnnouncementsModule } from "./announcements/announcements.module";
@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({
      dest: "./uploads",
    }),
    StudentModule,
    TeacherModule,
    SchoolModule,
    GroupModule,
    AttendanceModule,
    HolidayModule,
    ConfigurationModule,
    GroupMembershipModule,
    TemplateModule,
    NotificationModule,
    WorksheetModule,
    QuestionModule,
    LessonPlanModule,
    AdminFormModule,
    LikeModule,
    CommentModule,
    TrackAssessmentModule,
    AssessmentSetModule,
    InAppNotificationModule,
    MentorTrackingModule,
    MonitorTrackingModule,
    AnnouncementsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
