import { Injectable, HttpException } from "@nestjs/common";
import { StudentDto } from "../../student/dto/student.dto";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { map } from "rxjs";
import { SuccessResponse } from "src/success-response";
import { catchError } from "rxjs/operators";
import { ErrorResponse } from "src/error-response";
import { StudentSearchDto } from "src/student/dto/student-search.dto";
import { IServicelocator } from "../studentservicelocator";
export const SunbirdStudentToken = "SunbirdStudent";
@Injectable()
export class StudentService implements IServicelocator {
  private student: StudentDto;

  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/Student`;

  public async getStudent(studentId: any, request: any) {
    return this.httpService
      .get(`${this.url}/${studentId}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          let data = axiosResponse.data;

          const studentDto = new StudentDto(data);

          return new SuccessResponse({
            statusCode: 200,
            message: "student found Successfully",
            data: studentDto,
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

  public async createStudent(request: any, studentDto: StudentDto) {
    return this.httpService
      .post(`${this.url}`, studentDto, {
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

  public async updateStudent(id: string, request: any, studentDto: StudentDto) {
    var axios = require("axios");
    var data = studentDto;

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
      message: " Ok.",
      data: response.data,
    });
  }

  public async searchStudent(request: any, studentSearchDto: StudentSearchDto) {
    return this.httpService
      .post(`${this.url}/search`, studentSearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((response) => {
          const responsedata = response.data.map(
            (item: any) => new StudentDto(item)
          );
          return new SuccessResponse({
            statusCode: response.status,
            message: "Ok.",
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
