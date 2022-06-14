import { HttpService } from "@nestjs/axios";
import { Injectable, HttpException } from "@nestjs/common";
const resolvePath = require("object-resolve-path");
import { AxiosResponse } from "axios";
import { LessonPlanDto } from "src/lessonPlan/dto/lessonPlan.dto";
import { map } from "rxjs";
import { SuccessResponse } from "src/success-response";
import { catchError } from "rxjs/operators";
import { ErrorResponse } from "src/error-response";
import { LessonPlanSearchDto } from "src/lessonPlan/dto/lessonPlan.search.dto";
@Injectable()
export class LessonPlanService {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/Content`;

  public async getLessonPlan(lessonPlanId: string, request: any) {
    return this.httpService
      .get(`${this.url}/${lessonPlanId}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          let data = axiosResponse.data;

          const lessonPlanDto = new LessonPlanDto(data);
          return new SuccessResponse({
            statusCode: 200,
            message: "ok.",
            data: lessonPlanDto,
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
  public async createLessonPlan(request: any, lessonPlanDto: LessonPlanDto) {
    return this.httpService
      .post(`${this.url}`, lessonPlanDto, {
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

  public async updateLessonPlan(
    lessonPlanId: string,
    request: any,
    lessonPlanDto: LessonPlanDto
  ) {
    var axios = require("axios");
    var data = lessonPlanDto;

    var config = {
      method: "put",
      url: `${this.url}/${lessonPlanId}`,
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

  public async searchLessonPlan(
    request: any,
    lessonPlanSearchDto: LessonPlanSearchDto
  ) {
    return this.httpService
      .post(`${this.url}/search`, lessonPlanSearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((response) => {
          const responsedata = response.data.map(
            (item: any) => new LessonPlanDto(item)
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
