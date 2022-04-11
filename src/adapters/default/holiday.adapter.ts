import { HttpService } from "@nestjs/axios";
import { Injectable, HttpException } from "@nestjs/common";
const resolvePath = require("object-resolve-path");
import { AxiosResponse } from "axios";
import { HolidayDto } from "src/holiday/dto/holiday.dto";
import { first, map, Observable } from "rxjs";
import { SuccessResponse } from "src/success-response";
import { catchError } from "rxjs/operators";
import { ErrorResponse } from "src/error-response";
import { HolidaySearchDto } from "src/holiday/dto/holiday-search.dto";
@Injectable()
export class HolidayService {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/Holiday`;

  public async getHoliday(holidayId: string, request: any) {
    return this.httpService.get(`${this.url}/${holidayId}`, request).pipe(
      map((axiosResponse: AxiosResponse) => {
        let data = axiosResponse.data;
        const holiday = {
          holidayId: holidayId,
          date: data.Date,
          remark: data.remark,
          year: data.year,
          context: data.context,
          contextId: data.contextId,
          createdAt: data.osCreatedAt,
          updatedAt: data.osUpdatedAt,
          createdBy: data.osCreatedBy,
          updatedBy: data.osUpdatedBy,
        };

        const holidayDto = new HolidayDto(holiday);
        return new SuccessResponse({
          statusCode: 200,
          message: "ok.",
          data: holidayDto,
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
  public async createHoliday(request: any, holidayDto: HolidayDto) {
    return this.httpService.post(`${this.url}`, holidayDto, request).pipe(
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

  public async updateHoliday(
    holidayId: string,
    request: any,
    holidayDto: HolidayDto
  ) {
    var axios = require("axios");
    var data = holidayDto;

    var config = {
      method: "put",
      url: `${this.url}/${holidayId}`,
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

  public async searchHoliday(request: any, holidaySearchDto: HolidaySearchDto) {
    const template = {
      holidayId: "osid",
      date: "date",
      remark: "remark",
      year: "year",
      context: "context",
      contextId: "contextId",
      createdAt: "osCreatedAt",
      updatedAt: "osUpdatedAt",
      createdBy: "osCreatedBy",
      updatedBy: "osUpdatedBy",
    };
    return this.httpService
      .post(`${this.url}/search`, holidaySearchDto, request)
      .pipe(
        map((response) => {
          const responsedata = response.data.map((item: any) => {
            const holidayDetailDto = new HolidayDto(template);
            Object.keys(template).forEach((key) => {
              holidayDetailDto[key] = resolvePath(item, template[key]);
            });
            return holidayDetailDto;
          });

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
