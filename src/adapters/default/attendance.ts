import { Injectable, HttpException } from "@nestjs/common";
import { AttendanceDto } from "../../attendance/dto/attendance.dto";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { map } from "rxjs";
import { SuccessResponse } from "src/success-response";
import { catchError } from "rxjs/operators";
import { ErrorResponse } from "src/error-response";
import { AttendanceSearchDto } from "src/attendance/dto/attendance-search.dto";

@Injectable()
export class AttendanceService {
  private attendance: AttendanceInterface;

  constructor(private httpService: HttpService) {}

  read(id: any): Observable<AttendanceInterface> {
    return this.httpService
      .get(
        process.env.BASEAPIURL+"Attendance/"+id
      )
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          this.student = {
            attendanceId: id,
            userId: axiosResponse.data.student_id,
            groupId: axiosResponse.data.class_id,
            schoolId: axiosResponse.data.school_id,
            attendance: axiosResponse.data.present ? 'Present' : 'Absent',
            date: axiosResponse.data.date
          };
          return this.student;
        })
      );
  }
}
