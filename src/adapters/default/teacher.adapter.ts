import { Injectable, HttpException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { map } from "rxjs";
import { catchError } from "rxjs/operators";
import { SuccessResponse } from "src/success-response";
import { ErrorResponse } from "src/error-response";
import { TeacherSearchDto } from "src/teacher/dto/teacher-search.dto";
import { TeacherDto } from "../../teacher/dto/teacher.dto";

@Injectable()
export class TeacherService {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/Teacher`;

  public async getTeacher(id: any, request: any) {
    return this.httpService
      .get(`${this.url}/${id}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          let data = axiosResponse.data;

          const teacherDto = new TeacherDto(data);

          return new SuccessResponse({
            statusCode: 200,
            message: "Teacher found Successfully",
            data: teacherDto,
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

  public async createTeacher(request: any, teacherDto: TeacherDto) {
    return this.httpService
      .post(`${this.url}`, teacherDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          return new SuccessResponse({
            statusCode: 200,
            message: "Teacher created Successfully",
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

  public async updateTeacher(id: string, request: any, teacherDto: TeacherDto) {
    var axios = require("axios");
    var data = teacherDto;

    var config = {
      method: "put",
      url: `${this.url}/${id}`,
      headers: {
        Authorization: request.headers.authorization,
      },
      data: data,
    };
    const response = await axios(config);
    return new SuccessResponse({
      statusCode: 200,
      message: "Teacher updated Successfully",
      data: response.data,
    });
  }
  public async searchTeacher(request: any, teacherSearchDto: TeacherSearchDto) {
    return this.httpService
      .post(`${this.url}/search`, teacherSearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((response) => {
          const responsedata = response.data.map(
            (item: any) => new TeacherDto(item)
          );
          return new SuccessResponse({
            statusCode: response.status,
            message: "Teacher found Successfully",
            data: responsedata,
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
