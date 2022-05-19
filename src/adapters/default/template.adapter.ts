import { Injectable, HttpException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { map } from "rxjs";
import { SuccessResponse } from "src/success-response";
import { catchError } from "rxjs/operators";
import { ErrorResponse } from "src/error-response";
import { TemplateDto } from "src/template/dto/template.dto";
import { TemplateSearchDto } from "src/template/dto/template-search.dto";
import { TemplateContentDto } from "src/template/dto/template-content.dto";

@Injectable()
export class TemplateService {
  constructor(private httpService: HttpService) {}

  template = `${process.env.BASEAPIURL}/Template`;
  templateContent = `${process.env.BASEAPIURL}/Templatecontent`;

  public async createTemplate(request: any, templateDto: TemplateDto) {
    return this.httpService
      .post(`${this.template}`, templateDto, {
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
  public async createTemplateContent(
    request: any,
    templateContentDto: TemplateContentDto
  ) {
    return this.httpService
      .post(`${this.templateContent}`, templateContentDto, {
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
  public async getTemplate(templateId: string, request: any) {
    return this.httpService
      .get(`${this.template}/${templateId}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          let data = axiosResponse.data;

          const templateDto = new TemplateDto(data);
          return new SuccessResponse({
            statusCode: 200,
            message: "ok.",
            data: templateDto,
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

  public async getTemplateContent(templateId: string, request: any) {
    return this.httpService
      .get(`${this.templateContent}/${templateId}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          let data = axiosResponse.data;
          const templateDto = new TemplateContentDto(data);
          return new SuccessResponse({
            statusCode: 200,
            message: "ok.",
            data: templateDto,
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

  public async updateTemplate(
    id: string,
    request: any,
    templateDto: TemplateDto
  ) {
    var axios = require("axios");
    var data = templateDto;

    var config = {
      method: "put",
      url: `${this.template}/${id}`,
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

  public async updateTemplateContent(
    id: string,
    request: any,
    templateContentDto: TemplateContentDto
  ) {
    var axios = require("axios");
    var data = templateContentDto;

    var config = {
      method: "put",
      url: `${this.templateContent}/${id}`,
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
  public async searchTemplate(
    request: any,
    templateSearchDto: TemplateSearchDto
  ) {
    return this.httpService
      .post(`${this.template}/search`, templateSearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((response) => {
          const responsedata = response.data.map(
            (item: any) => new TemplateDto(item)
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
