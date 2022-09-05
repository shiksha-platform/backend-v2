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
import { IServicelocator } from "../holidayservicelocator";
export const SunbirdHolidayToken = "SunbirdHoliday";
@Injectable()
export class SunbirdHolidayService implements IServicelocator {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/Holiday`;

  public async getHoliday(holidayId: string, request: any) {
    return this.httpService
      .get(`${this.url}/${holidayId}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          let data = axiosResponse.data;

          const holidayDto = new HolidayDto(data);
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
    return this.httpService
      .post(`${this.url}`, holidayDto, {
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
    return this.httpService
      .post(`${this.url}/search`, holidaySearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((response) => {
          const responsedata = response.data.map(
            (item: any) => new HolidayDto(item)
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

  public async holidayFilter(fromDate: string, toDate: string, request: any) {
    let axios = require("axios");
    let filters = {
      fromDate,
      toDate,
    };
    const filterArray = Object.keys(filters).filter(
      (value, key) => filters[value] && filters[value] !== ""
    );
    let data = { date: { between: [] } };
    filterArray.forEach((value, key) => {
      if (["fromDate", "toDate"].includes(value)) {
        data["date"].between.push(filters[value]);
      }
    });

    let config = {
      method: "post",
      url: `${this.url}/search`,
      headers: {
        Authorization: request.headers.authorization,
      },
      data: { filters: data },
    };

    const response = await axios(config);

    let result =
      response?.data && response.data.map((item: any) => new HolidayDto(item));

    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: result,
    });
  }
}
