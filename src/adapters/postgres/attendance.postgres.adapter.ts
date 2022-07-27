import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AttendanceDto } from "src/attendance/dto/attendance.dto";
import { SuccessResponse } from "src/success-response";
import { AttendanceSearchDto } from "src/attendance/dto/attendance-search.dto";
import { Client } from "pg";
@Injectable()
export class AttendanceService {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/Attendance`;
  studentAPIUrl = `${process.env.BASEAPIURL}/Student`;

  public async getAttendance(attendanceId: string) {
    const client = new Client();
    client.connect();
    client.query(
      `SELECT * FROM attendance WHERE id = '${attendanceId}'`,
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res.rows);
        }
      }
    );
    client.end();
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: [],
    });
  }

  public async createAttendance(attendanceDto: AttendanceDto) {
    const client = new Client();
    client.connect();
    client.query(
      `INSERT INTO attendance (attendanceRecordId, studentId, attendance, date) VALUES ('${attendanceDto.attendanceId}', '${attendanceDto.userId}', '${attendanceDto.attendanceDate}', '${attendanceDto.attendance}')`,
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res.rows);
        }
      }
    );
    client.end();
  }

  public async updateAttendance(
    attendanceId: string,
    attendanceDto: AttendanceDto
  ) {
    const client = new Client();
    client.connect();
    client.query(
      `UPDATE attendance SET attendance = '${attendanceDto.attendance}' WHERE id = '${attendanceId}'`,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
    client.end();
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: [],
    });
  }

  public async searchAttendance(
    request: any,
    attendanceSearchDto: AttendanceSearchDto
  ) {
    const client = new Client();
    client.connect();
    client.query(
      `SELECT * FROM attendance WHERE attendanceDate >= '${attendanceSearchDto.attendanceFromDate}' AND attendanceDate <= '${attendanceSearchDto.attendanceToDate} AND studentId = '${attendanceSearchDto.studentId}'`,
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res.rows);
        }
      }
    );
    client.end();
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: [],
    });
  }
}
