import { AttendanceSearchDto } from "src/attendance/dto/attendance-search.dto";
import { AttendanceDto } from "src/attendance/dto/attendance.dto";

export interface IServicelocator {
  getAttendance(attendanceId: any, request: any);
  updateAttendance(
    attendanceId: string,
    request: any,
    attendanceDto: AttendanceDto
  );
  createAttendance(request: any, attendanceDto: AttendanceDto);
  multipleAttendance(request: any, attendanceData: [Object]);
  searchAttendance(request: any, attendanceSearchDto: AttendanceSearchDto);
  attendanceFilter(
    fromDate: string,
    toDate: string,
    userId: string,
    userType: string,
    attendance: string,
    groupId: string,
    schoolId: string,
    eventId: string,
    topicId: string,
    request: any
  );
  studentAttendanceByGroup(date: string, groupId: string, request: any);
  studentAttendanceByUserId(date: string, userId: string, request: any);
}
