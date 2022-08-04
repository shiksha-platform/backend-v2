import { Injectable, HttpException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { map } from "rxjs";
import { catchError } from "rxjs/operators";
import { SuccessResponse } from "src/success-response";
import { ErrorResponse } from "src/error-response";
import { UserSearchDto } from "src/user/dto/user-search.dto";
import { UserDto } from "../../user/dto/user.dto";
import jwt_decode from "jwt-decode";
import { IServicelocator } from "../userservicelocator";
import { TeacherSegementDto } from "src/user/dto/teacher-segment.dto";
export const SunbirdUserToken = "SunbirdUser";
@Injectable()
export class UserService implements IServicelocator {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/User`;
  templaterURL = process.env.TEMPLATERURL;

  public async getUser(id: any, request: any) {
    return this.httpService
      .get(`${this.url}/${id}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          let data = axiosResponse.data;

          const teacherDto = new UserDto(data);

          return new SuccessResponse({
            statusCode: 200,
            message: "User found Successfully",
            data: teacherDto,
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

  public async createUser(request: any, teacherDto: UserDto) {
    return this.httpService
      .post(`${this.url}`, teacherDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          return new SuccessResponse({
            statusCode: 200,
            message: "User created Successfully",
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

  public async updateUser(id: string, request: any, teacherDto: UserDto) {
    var axios = require("axios");
    var data = teacherDto;

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
      message: "User updated Successfully",
      data: response.data,
    });
  }
  public async searchUser(request: any, teacherSearchDto: UserSearchDto) {
    return this.httpService
      .post(`${this.url}/search`, teacherSearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((response) => {
          const responsedata = response.data.map(
            (item: any) => new UserDto(item)
          );
          return new SuccessResponse({
            statusCode: response.status,
            message: "User found Successfully",
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

  public async getUserByAuth(request: any) {
    const authToken = request.headers.authorization;
    const decoded: any = jwt_decode(authToken);
    let email = decoded.email;

    let axios = require("axios");
    let data = {
      filters: {
        email: {
          eq: `${email}`,
        },
      },
    };
    let config = {
      method: "post",
      url: `${this.url}/search`,
      headers: {
        Authorization: request.headers.authorization,
      },
      data: data,
    };
    const response = await axios(config);
    let result =
      response?.data && response.data.map((item: any) => new UserDto(item));

    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: result,
    });
  }

  public async teacherSegment(
    schoolId: string,
    templateId: string,
    request: any
  ) {
    const teacherSearchDto = {
      filters: {
        schoolId: {
          eq: `${schoolId}`,
        },
      },
    };
    var axios = require("axios");
    var getTemplate = {
      method: "get",
      url: `${this.templaterURL}${templateId}`,
    };
    const getfcmClickActionUrl = await axios(getTemplate);
    const fcmClickActionUrlData = getfcmClickActionUrl.data;
    let tagString = JSON.stringify(fcmClickActionUrlData.tag[0]);
    var jsonToObj = JSON.parse(tagString);
    let fcmClickActionUrl = JSON.parse(jsonToObj);

    let config = {
      method: "post",
      url: `${this.url}/search`,

      data: teacherSearchDto,
    };
    const response = await axios(config);
    let responseData = response.data.map(
      (item: any) => new TeacherSegementDto(item)
    );
    const teachersegment = responseData.map((obj: any) => {
      return { ...obj, fcmClickActionUrl: fcmClickActionUrl.attendance };
    });

    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: teachersegment,
    });
  }
}
