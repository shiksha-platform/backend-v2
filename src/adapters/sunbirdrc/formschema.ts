import { HttpService } from "@nestjs/axios";
import { Injectable, HttpException } from "@nestjs/common";
const resolvePath = require("object-resolve-path");
import { AxiosResponse } from "axios";
import { FormschemaDto } from "src/formschema/dto/formschema.dto";
import { first, map, Observable } from "rxjs";
import { SuccessResponse } from "src/success-response";
import { catchError } from "rxjs/operators";
import { ErrorResponse } from "src/error-response";
import { FormschemaSearchDto } from "src/formschema/dto/formschema-search.dto";
@Injectable()
export class FormschemaService {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/Formschema`;

  public async getFormschema(formschemaId: string, request: any) {
    return this.httpService
      .get(`${this.url}/${formschemaId}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          let data = axiosResponse.data;

          const formschemaDto = new FormschemaDto(data);
          return new SuccessResponse({
            statusCode: 200,
            message: "ok.",
            data: formschemaDto,
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
  public async createFormschema(request: any, formschemaDto: FormschemaDto) {
    return this.httpService
      .post(`${this.url}`, formschemaDto, {
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

  public async updateFormschema(
    formschemaId: string,
    request: any,
    formschemaDto: FormschemaDto
  ) {
    var axios = require("axios");
    var data = formschemaDto;

    var config = {
      method: "put",
      url: `${this.url}/${formschemaId}`,
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

  public async searchFormschema(
    request: any,
    formschemaSearchDto: FormschemaSearchDto
  ) {
    return this.httpService
      .post(`${this.url}/search`, formschemaSearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((response) => {
          const responsedata = response.data.map(
            (item: any) => new FormschemaDto(item)
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

  public async formschemaFilter(
    fromDate: string,
    toDate: string,
    request: any
  ) {
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
      response?.data &&
      response.data.map((item: any) => new FormschemaDto(item));

    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: result,
    });
  }
}
