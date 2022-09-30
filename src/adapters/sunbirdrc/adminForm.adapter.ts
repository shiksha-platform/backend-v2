import { HttpService } from "@nestjs/axios";
import { Injectable, HttpException } from "@nestjs/common";
const resolvePath = require("object-resolve-path");
import { AxiosResponse } from "axios";
import { AdminFormDto } from "src/adminForm/dto/adminForm.dto";
import { first, map, Observable } from "rxjs";
import { SuccessResponse } from "src/success-response";
import { catchError } from "rxjs/operators";
import { ErrorResponse } from "src/error-response";
import { AdminFormSearchDto } from "src/adminForm/dto/adminForm-search.dto";
@Injectable()
export class AdminFormService {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/AdminForm`;

  public async getAdminForm(adminFormId: string, request: any) {
    return this.httpService
      .get(`${this.url}/${adminFormId}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map(async (axiosResponse: AxiosResponse) => {
          let data = [axiosResponse.data];

          const adminFormDto = await this.mappedResponse(data);
          return new SuccessResponse({
            statusCode: 200,
            message: "ok.",
            data: adminFormDto[0],
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

  public async createAdminForm(request: any, adminFormDto: AdminFormDto) {
    return this.httpService
      .post(`${this.url}`, adminFormDto, {
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

  public async updateAdminForm(
    adminFormId: string,
    request: any,
    adminFormDto: AdminFormDto
  ) {
    var axios = require("axios");
    var data = adminFormDto;

    var config = {
      method: "put",
      url: `${this.url}/${adminFormId}`,
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

  public async searchAdminForm(
    request: any,
    adminFormSearchDto: AdminFormSearchDto
  ) {
    return this.httpService
      .post(`${this.url}/search`, adminFormSearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map(async (response) => {
          const responsedata = await this.mappedResponse(response.data);
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

  public async adminFormFilter(fromDate: string, toDate: string, request: any) {
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

    let result = response?.data && response.data;
    const responsedata = await this.mappedResponse(result);
    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: responsedata,
    });
  }

  public async mappedResponse(result: any) {
    const adminFormResponse = result.map((obj: any) => {
      const adminFormMapping = {
        adminFormId: obj?.osid ? `${obj.osid}` : "",
        moduleId: obj?.moduleId ? `${obj.moduleId}` : "",
        formSchema: obj?.formSchema ? `${obj.formSchema}` : "",
        createdAt: obj?.osCreatedAt ? `${obj.osCreatedAt}` : "",
        updatedAt: obj?.osUpdatedAt ? `${obj.osUpdatedAt}` : "",
        createdBy: obj?.osCreatedBy ? `${obj.osCreatedBy}` : "",
        updatedBy: obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "",
      };
      return new AdminFormDto(adminFormMapping);
    });

    return adminFormResponse;
  }
}
