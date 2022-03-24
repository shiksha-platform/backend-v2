import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { SchoolModule } from './school/school.module';
import { AttendanceModule } from './attendance/attendance.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [StudentModule, TeacherModule, SchoolModule, GroupModule, AttendanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
