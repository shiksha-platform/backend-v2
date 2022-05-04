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

  public async createConfig(request: any, configDto: ConfigDto)
  {
    let axios = require("axios");
    let data = {
      filters: {
        module: {
          eq: `${configDto.module}`,
        },
        key: {
          eq: `${configDto.key}`,
        },
        contextId: {
          eq: `${configDto.contextId}`,
        },
      },
    };

    let config = {
      method: "post",
      url: `${this.url}/search`,

      data: data,
    };

    const response = await axios(config);
    let resData = response?.data;
    let result = resData.map((item: any) => new ConfigDto(item));

    let configId = result.map(function (ConfigDto) {
      return ConfigDto.configId
    })

    if (resData.length > 0)
    {
      var udateData = configDto;
      var updateConfig = {
      method: "put",
      url: `${this.url}/${configId}`,
      headers: {
        Authorization: request.headers.authorization,
      },
      data: udateData,
      };
      const response = await axios(updateConfig);
      console.log("123");
      console.log(configId);
      console.log(response);
      return new SuccessResponse({
        statusCode: 200,
        message: " Ok.",
        data: response.data,
      });
    }
    else
    {
      return this.httpService
      .post(`${this.url}`, configDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          console.log("140" + axiosResponse.data);
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
