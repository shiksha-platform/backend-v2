import { Injectable } from "@nestjs/common";
import { AttendanceInterface } from "./interfaces/attendance.interface";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { first, map, Observable } from "rxjs";
import { response } from "express";

@Injectable()
export class AttendanceService {
  private attendance: AttendanceInterface;

  constructor(private httpService: HttpService) {}

  getOne(id: any): Observable<AttendanceInterface> {
    return this.httpService
      .get(
        process.env.BASEAPIURL+ "Attendance/"+id
      )
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          this.attendance = {
            attendanceId: id,
            attendance: axiosResponse.data.attendance,
            date: axiosResponse.data.date,
            subjectId: axiosResponse.data.subjectId,
            studentId: axiosResponse.data.studentId,
            classId: axiosResponse.data.classId,
            teacherId: axiosResponse.data.teacherId,
            attendanceNote: axiosResponse.data.attendanceNote,
           };
          return this.attendance;
        })
      );
  }
}
