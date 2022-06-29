import { HttpException, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { catchError, map } from "rxjs";
import { SchoolDto } from "src/school/dto/school.dto";
import { SchoolSearchDto } from "src/school/dto/school-search.dto";
import { SuccessResponse } from "src/success-response";
import { ErrorResponse } from "src/error-response";
import { IServicelocator } from "../schoolservicelocator";
export const SunbirdSchoolToken = "SunbirdSchool";
@Injectable()
export class SchoolService implements IServicelocator {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/School`;

  public async getSchool(id: any, request: any) {
    return this.httpService
      .get(`${this.url}/${id}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          const data = axiosResponse.data;
          const schoolDto = new SchoolDto(data);

          return new SuccessResponse({
            statusCode: 200,
            message: " Ok.",
            data: schoolDto,
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

  public async createSchool(request: any, schoolDto: SchoolDto) {
    return this.httpService
      .post(`${this.url}`, schoolDto, {
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

  public async updateSchool(id: string, request: any, schoolDto: SchoolDto) {
    var axios = require("axios");
    var data = schoolDto;

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

  public async searchSchool(request: any, schoolSearchDto: SchoolSearchDto) {
    return this.httpService
      .post(`${this.url}/search`, schoolSearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((response) => {
          const responsedata = response.data.map(
            (item: any) => new SchoolDto(item)
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
