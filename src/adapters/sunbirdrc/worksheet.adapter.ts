import { HttpException, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { WorksheetDto } from "src/worksheet/dto/worksheet.dto";
import { AxiosResponse } from "axios";
import { map, catchError } from "rxjs";
import { ErrorResponse } from "src/error-response";
import { WorksheetSearchDto } from "src/worksheet/dto/worksheet-search.dto";

@Injectable()
export class WorksheetService {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/Worksheet`;

  public async createWorksheet(request: any, worksheetDto: WorksheetDto) {
    return this.httpService
      .post(`${this.url}`, worksheetDto, {
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

  public async updateWorksheet(
    id: string,
    request: any,
    worksheetDto: WorksheetDto
  ) {
    var axios = require("axios");
    var data = worksheetDto;

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

  public async getWorksheet(worksheetId: any, request: any) {
    return this.httpService
      .get(`${this.url}/${worksheetId}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          let data = axiosResponse.data;

          const worksheetDto = new WorksheetDto(data);

          return new SuccessResponse({
            statusCode: 200,
            message: "ok",
            data: worksheetDto,
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
  public async searchWorksheet(
    request: any,
    worksheetSearchDto: WorksheetSearchDto
  ) {
    return this.httpService
      .post(`${this.url}/search`, worksheetSearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((response) => {
          const responsedata = response.data.map(
            (item: any) => new WorksheetDto(item)
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
