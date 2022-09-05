import { Injectable, HttpException } from "@nestjs/common";
import { GroupInterface } from "../../group/interfaces/group.interface";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { first, map, Observable } from "rxjs";
import { response } from "express";
import { SuccessResponse } from "src/success-response";
const resolvePath = require("object-resolve-path");
import { GroupDto } from "src/group/dto/group.dto";
import { catchError } from "rxjs/operators";
import { ErrorResponse } from "src/error-response";
import { GroupSearchDto } from "src/group/dto/group-search.dto";
import { IServicelocatorgroup } from "../groupservicelocator";
import { StudentDto } from "src/student/dto/student.dto";
import { UserDto } from "src/user/dto/user.dto";
export const SunbirdGroupToken = "SunbirdGroup";
@Injectable()
export class SunbirdGroupService implements IServicelocatorgroup {
  private group: GroupInterface;

  constructor(private httpService: HttpService) {}

  url = `${process.env.BASEAPIURL}`;

  public async getGroup(groupId: any, request: any) {
    return this.httpService
      .get(`${this.url}/Class/${groupId}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          let data = axiosResponse.data;
          const groupDto = new GroupDto(data);
          return new SuccessResponse({
            statusCode: 200,
            message: "Ok..",
            data: groupDto,
          });
        })
      );
  }

  public async createGroup(request: any, groupDto: GroupDto) {
    return this.httpService
      .post(`${this.url}/Class`, groupDto, {
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
  public async updateGroup(groupId: string, request: any, groupDto: GroupDto) {
    var axios = require("axios");
    var data = groupDto;

    var config = {
      method: "put",
      url: `${this.url}/Class/${groupId}`,
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

  public async searchGroup(request: any, groupSearchDto: GroupSearchDto) {
    return this.httpService
      .post(`${this.url}/Class/search`, groupSearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((response) => {
          const responsedata = response.data.map(
            (item: any) => new GroupDto(item)
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
  public async findMembersOfGroup(id: string, role: string, request: any) {
    if (role == "Student") {
      let axios = require("axios");
      let data = {
        filters: {
          currentClassId: {
            eq: `${id}`,
          },
        },
      };

      let config = {
        method: "post",
        url: `${this.url}/Student/search`,
        headers: {
          Authorization: request.headers.authorization,
        },
        data: data,
      };

      const response = await axios(config);
      let result =
        response?.data &&
        response.data.map((item: any) => new StudentDto(item));

      return new SuccessResponse({
        statusCode: 200,
        message: "ok",
        data: result,
      });
    } else if (role == "Teacher") {
      let axios = require("axios");

      let final = {
        method: "get",
        url: `${this.url}/Class/${id}`,
        headers: {
          Authorization: request.headers.authorization,
        },
      };

      const response = await axios(final);
      let classObj = response?.data;
      let resData = [];
      if (classObj?.teacherId) {
        let classFinal = {
          method: "get",
          url: `${this.url}/User/${classObj.teacherId}`,
          headers: {
            Authorization: request.headers.authorization,
          },
        };

        const responseData = await axios(classFinal);

        const teacherDetailDto = new UserDto(responseData.data);

        resData = [teacherDetailDto];
      }
      return new SuccessResponse({
        statusCode: 200,
        message: "ok",
        data: resData,
      });
    } else {
      return new SuccessResponse({
        statusCode: 200,
        message: "ok",
        data: { msg: "Unable to get data !!" },
      });
    }
  }

  public async findGroupsByUserId(id: string, role: string, request: any) {
    let responseData = [];

    if (role === "Teacher") {
      let axios = require("axios");
      let data = {
        filters: {
          teacherId: {
            eq: `${id}`,
          },
        },
      };

      let final = {
        method: "post",
        url: `${this.url}/Class/search`,
        headers: {
          Authorization: request.headers.authorization,
        },
        data: data,
      };

      const response = await axios(final);
      responseData = response.data;
    } else if (role === "Student") {
      let axios = require("axios");
      const config = {
        method: "get",
        url: `${this.url}/Student/${id}`,
        headers: {
          Authorization: request.headers.authorization,
        },
      };

      const response = await axios(config);
      let studentObj = response?.data;

      if (studentObj?.currentClassId) {
        let studentFinal = {
          method: "get",
          url: `${this.url}/Class/${studentObj.currentClassId}`,
          headers: {
            Authorization: request.headers.authorization,
          },
        };
        const resData = await axios(studentFinal);

        responseData = resData?.data ? [resData.data] : [];
      }
    }
    let result = responseData.map((item: any) => new GroupDto(item));
    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: result,
    });
  }
  public async findMembersOfChildGroup(
    groupId: string,
    role: string,
    request: any
  ) {}
}
