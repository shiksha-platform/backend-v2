import { AttendanceDto } from "src/attendance/dto/attendance.dto";

export interface IServicelocator {
  getAttendance(attendanceId: any, request: any);
  createAttendance(request: any, attendanceDto: AttendanceDto);
}
