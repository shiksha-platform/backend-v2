import { HttpException, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { EsamwadStudentDto } from "src/student/dto/esamwad-student.dto";
import { AxiosResponse } from "axios";
import { map, catchError } from "rxjs";
import { ErrorResponse } from "src/error-response";
import { IServicelocator } from "../studentservicelocator";
import { StudentSearchDto } from "src/student/dto/student-search.dto";
export const EsamwadStudentToken = "EsamwadStudent";
@Injectable()
export class EsamwadStudentService implements IServicelocator {
  constructor(private httpService: HttpService) {}
  url = `${process.env.ESAMWADAPI}/v5/student`;

  public async searchStudent(request: any, studentSearchDto: StudentSearchDto) {
    var axios = require("axios");

    var config = {
      method: "get",
      url: this.url,
      headers: {
        Authorization: process.env.ESAMWADTOKEN,
      },
    };

    const response = await axios(config);
    const responseData = response.data.data;
    console.log(responseData);

    const responsedata = responseData.map(
      (item: any) => new EsamwadStudentDto(item)
    );

    console.log(responsedata);
    return new SuccessResponse({
      statusCode: 200,
      message: "ok.",
      data: responsedata,
    });
  }

  public async getStudent(studentId: any, request: any) {
    return this.httpService
      .get(`${this.url}/${studentId}`, {
        headers: {
          Authorization: process.env.ESAMWADTOKEN,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          let data = axiosResponse.data.data;

          console.log(data);

          const responsedata = data.map(
            (item: any) => new EsamwadStudentDto(item)
          );

          return new SuccessResponse({
            statusCode: 200,
            message: "student found Successfully",
            data: responsedata,
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
}
