import { CacheModule, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { StudentModule } from "./student/student.module";
import { TeacherModule } from "./teacher/teacher.module";
import { SchoolModule } from "./school/school.module";
import { AttendanceModule } from "./attendance/attendance.module";
import { GroupModule } from "./group/group.module";
import { HolidayModule } from "./holiday/holiday.module";
import { ConfigModule } from "@nestjs/config";
import { GroupMembershipModule } from "./groupMembership/groupMembership.module";
@Module({
  imports: [
    ConfigModule.forRoot(),
    StudentModule,
    TeacherModule,
    SchoolModule,
    GroupModule,
    AttendanceModule,
    HolidayModule,
    GroupMembershipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
