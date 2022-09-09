import { Injectable, HttpException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { map } from "rxjs";
import { SuccessResponse } from "src/success-response";
import { catchError } from "rxjs/operators";
import { ErrorResponse } from "src/error-response";
import { TemplateProcessDto } from "src/template/dto/template-process.dto";
import { TemplateCreateDto } from "src/template/dto/template-create.dto";

@Injectable()
export class TemplateService {
  constructor(private httpService: HttpService) {}
  url = process.env.TEMPLATERURL;

  public async createTemplate(request: any, templateDto: TemplateCreateDto) {
    var axios = require("axios");

    var config = {
      method: "post",
      url: this.url,
      headers: {
        Authorization: request.headers.authorization,
      },
      data: templateDto,
    };

    const response = await axios(config);
    const responseData = response.data;
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: responseData,
    });
  }

  public async getTemplate(id: any, request: any) {
    return this.httpService
      .get(`${this.url}${id}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map(async (axiosResponse: AxiosResponse) => {
          let data = [axiosResponse.data];

          const templateDto = await this.templateCreate(data);

          return new SuccessResponse({
            statusCode: 200,
            message: "ok",
            data: templateDto[0],
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
  public async processTemplate(
    request: any,
    templateProcessDto: TemplateProcessDto
  ) {
    var axios = require("axios");

    var config = {
      method: "post",
      url: `${this.url}process`,
      headers: {
        Authorization: request.headers.authorization,
      },
      data: templateProcessDto,
    };

    const response = await axios(config);
    const responseData = response.data;
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: responseData,
    });
  }
  public async getTemplateByTag(tag: string, request: any) {
    var axios = require("axios");

    let config = {
      method: "get",
      url: `${this.url}search/tag?queryString=${tag}`,
    };

    const response = await axios(config);
    const data = response?.data;

    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: data,
    });
  }

  public async templateCreate(result: any) {
    const templateCreateResponse = result.map((item: any) => {
      const templateMapping = {
        body: item?.body ? `${item.body}` : "",
        type: item?.type ? `${item.type}` : "",
        user: item?.user ? `${item.user}` : "",
        tag: item?.tag,
        createdAt: item?.createdAt ? `${item.createdAt}` : "",
        updatedAt: item?.updatedAt ? `${item.updatedAt}` : "",
      };
      return new TemplateCreateDto(templateMapping);
    });

    return templateCreateResponse;
  }

  public async templateProcess(result: any) {
    const templateProcessResponse = result.map((item: any) => {
      const templateMapping = {
        id: item?.id ? item.id : "",
        data: item?.data ? item.data : "",
      };
      return new TemplateCreateDto(templateMapping);
    });

    return templateProcessResponse;
  }
}
