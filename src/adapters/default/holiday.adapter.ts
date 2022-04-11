import { HttpService } from "@nestjs/axios";
import { Injectable, HttpException } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { HolidayDto } from "src/holiday/dto/holiday.dto";
import { first, map, Observable } from "rxjs";
import { SuccessResponse } from "src/success-response";
import { catchError } from "rxjs/operators";
import { ErrorResponse } from "src/error-response";
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
}
