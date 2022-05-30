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
import { MulterModule } from "@nestjs/platform-express/multer";
import { QuestionModule } from "./Question/question.module";
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
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
