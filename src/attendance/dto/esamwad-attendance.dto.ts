import { Expose } from "class-transformer";

export class EsamwadAttendanceDto {
  @Expose()
  attendanceId: string;
  @Expose()
  schoolId: string;
  @Expose()
  userId: string;
  @Expose()
  attendanceDate: string;
  @Expose()
  attendance: boolean;
  @Expose()
  metaData: string;
  @Expose()
  createdAt: string;
  @Expose()
  updatedAt: string;

  constructor(obj: any) {
    this.attendanceId = obj?.id ? `${obj.id}` : "";
    this.schoolId = obj?.taken_by_school_id ? obj.taken_by_school_id : "";
    this.userId = obj?.student_id ? `${obj.student_id}` : "";
    this.attendanceDate = obj?.date ? `${obj.date}` : "";
    this.attendance = obj.is_present;
    this.metaData = obj?.temperature;
    this.createdAt = obj?.created ? `${obj.created}` : "";
    this.updatedAt = obj?.updated ? `${obj.updated}` : "";
  }
}
