import { Injectable, HttpException } from "@nestjs/common";
import { AttendanceInterface } from "../../attendance/interfaces/attendance.interface";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { first, map, Observable } from "rxjs";
import { response } from "express";
import { AttendanceDto } from "src/attendance/dto/attendance.dto";
import { SuccessResponse } from "src/success-response";
import { ErrorResponse } from "src/error-response";
import { catchError } from "rxjs/operators";
import { AttendanceSearchDto } from "src/attendance/dto/attendance-search.dto";
const resolvePath = require("object-resolve-path");
@Injectable()
export class AttendanceService {
  private attendance: AttendanceInterface;

  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/Attendance`;
  public async getAttendance(attendanceId: any, request: any) {
    return this.httpService
      .get(`${this.url}/${attendanceId}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          const data = axiosResponse.data;
          const attendanceDto = new AttendanceDto(data);
          return new SuccessResponse({
            statusCode: 200,
            message: "ok.",
            data: attendanceDto,
          });
        })
      );
  }
  public async createAttendance(request: any, attendanceDto: AttendanceDto) {
    return this.httpService
      .post(`${this.url}`, attendanceDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          return new SuccessResponse({
            statusCode: 200,
            message: "Ok.",
            data: axiosResponse.data,
          });
        }),
        catchError((e) => {
          var error = new ErrorResponse({
            errorCode: e.response?.status,
            errorMessage: e.response?.data?.params?.errmsg,
          });
          throw new HttpException(error, e.response.status);
        })
      );
  }

  public async updateAttendance(
    attendanceId: string,
    request: any,
    attendanceDto: AttendanceDto
  ) {
    var axios = require("axios");
    var data = attendanceDto;

    var config = {
      method: "put",
      url: `${this.url}/${attendanceId}`,
      headers: {
        Authorization: request.headers.authorization,
      },
      data: data,
    };
    const response = await axios(config);
    return new SuccessResponse({
      statusCode: 200,
      message: " Ok.",
      data: response.data,
    });
  }

  public async searchAttendance(
    request: any,
    attendanceSearchDto: AttendanceSearchDto
  ) {
    return this.httpService
      .post(`${this.url}/search`, attendanceSearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((response) => {
          return response.data.map((item) => {
            const responsedata = new AttendanceDto(item);
            return new SuccessResponse({
              statusCode: response.status,
              message: "Ok.",
              data: responsedata,
            });
          });
        }),
        catchError((e) => {
          var error = new ErrorResponse({
            errorCode: e.response.status,
            errorMessage: e.response.data.params.errmsg,
          });
          throw new HttpException(error, e.response.status);
        })
      );
  }
}
