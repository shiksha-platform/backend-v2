import { Injectable, HttpException } from "@nestjs/common";
import { catchError } from "rxjs/operators";
import { ErrorResponse } from "src/error-response";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { first, map, Observable } from "rxjs";
import { response } from "express";
import { SuccessResponse } from "src/success-response";
import { GroupMembershipDto } from "src/groupMembership/dto/groupMembership.dto";
import { GroupMembershipSearchDto } from "src/groupMembership/dto/groupMembership-search.dto";
const resolvePath = require("object-resolve-path");
@Injectable()
export class GroupMembershipService {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/`;

  public async getGroupMembership(id: any, request: any) {
    return this.httpService
      .get(`${this.url}/${id}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          const data = axiosResponse.data;
          const attendanceDto = new GroupMembershipDto(data);
          return new SuccessResponse({
            statusCode: 200,
            message: "ok.",
            data: attendanceDto,
          });
        })
      );
  }

  public async createGroupMembership(
    request: any,
    groupMembershipDto: GroupMembershipDto
  ) {
    return this.httpService
      .post(`${this.url}`, groupMembershipDto, {
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

  public async updateGroupMembership(
    id: string,
    request: any,
    groupMembershipDto: GroupMembershipDto
  ) {
    var axios = require("axios");
    var data = groupMembershipDto;

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

  public async searchGroupMembership(
    request: any,
    groupMembershipSearchDto: GroupMembershipSearchDto
  ) {
    return this.httpService
      .post(`${this.url}/search`, groupMembershipSearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((response) => {
          return response.data.map((item) => {
            const responsedata = new GroupMembershipDto(item);
            return new SuccessResponse({
              statusCode: response.status,
              message: "Ok.",
              data: responsedata,
            });
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
