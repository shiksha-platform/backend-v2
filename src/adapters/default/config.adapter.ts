import { HttpService } from "@nestjs/axios";
import { Injectable, HttpException } from "@nestjs/common";
const resolvePath = require("object-resolve-path");
import { AxiosResponse } from "axios";
import { ConfigDto } from "src/configs/dto/config.dto";
import { first, map, Observable } from "rxjs";
import { SuccessResponse } from "src/success-response";
import { catchError } from "rxjs/operators";
import { ErrorResponse } from "src/error-response";
import { ConfigSearchDto } from "src/configs/dto/config-search.dto";
import jwt_decode from "jwt-decode";
import { TeacherDto } from "../../teacher/dto/teacher.dto";
@Injectable()
export class ConfigService {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/Config`;

  public async getConfig(configId: string, request: any) {
    return this.httpService
      .get(`${this.url}/${configId}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          let data = axiosResponse.data;

          const configDto = new ConfigDto(data);
          return new SuccessResponse({
            statusCode: 200,
            message: "ok.",
            data: configDto,
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

  public async findConfigByModule(module: string, request: any) {
    let responseData = [];

      let axios = require("axios");
      let data = {
        filters: {
          module: {
            eq: `${module}`,
          },
        },
      };

      let final = {
        method: "post",
        url: `${this.url}/search`,
        headers: {
          Authorization: request.headers.authorization,
        },
        data: data,
      };

      const response = await axios(final);
      responseData = response.data;

    let result = responseData.map((item: any) => new ConfigDto(item));
    
    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: result,
    });
  }

  public async createConfig(request: any, configDto: ConfigDto) {
    return this.httpService
      .post(`${this.url}`, configDto, {
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

  public async updateConfig(
    configId: string,
    request: any,
    configDto: ConfigDto
  ) {
    var axios = require("axios");
    var data = configDto;

    var config = {
      method: "put",
      url: `${this.url}/${configId}`,
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

  public async searchConfig(request: any, configSearchDto: ConfigSearchDto) {
    return this.httpService
      .post(`${this.url}/search`, configSearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((response) => {
          const responsedata = response.data.map(
            (item: any) => new ConfigDto(item)
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

  public async getConfigForTeacher(request: any) {
    const authToken = request.headers.authorization;
    const decoded: any = jwt_decode(authToken);
    let email = decoded.email;

    let axios = require("axios");
    let teacherData = {
      filters: {
        email: {
          eq: `${email}`,
        },
      },
    };
    let config = {
      method: "post",
      url: `${process.env.BASEAPIURL}/Teacher/search`,
      headers: {
        Authorization: request.headers.authorization,
      },
      data: teacherData,
    };
    const response = await axios(config);

    let teacherProfileData =
      response?.data && response.data.map((item: any) => new TeacherDto(item));
      
      let schoolId = teacherProfileData.map(function (TeacherDto) {
        return TeacherDto.schoolId
      })

      let data = {
        filters: {
          contextId: {
            eq: `${schoolId}`,
          },
        },
      };

      let final = {
        method: "post",
        url: `${this.url}/search`,
        headers: {
          Authorization: request.headers.authorization,
        },
        data: data,
      };

      const confifResponse = await axios(final);
      let result =
      confifResponse?.data && confifResponse.data.map((item: any) => new ConfigDto(item));
      return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: result,
    });
  }
}
