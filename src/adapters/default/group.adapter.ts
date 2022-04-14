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
@Injectable()
export class GroupService {
  private group: GroupInterface;

  constructor(private httpService: HttpService) {}

  url = `${process.env.BASEAPIURL}/Class`;

  public async getGroup(groupId: string, request: any) {
    return this.httpService
      .get(`${this.url}/${groupId}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          let data = axiosResponse.data;
          const group = {
            groupId: data.osid,
            name: data.name,
            schoolId: data.schoolId,
            type: data.type,
            status: data.status,
            mediumOfInstruction: data.mediumOfInstruction,
            image: data.image,
            createdAt: data.osCreatedAt,
            updatedAt: data.osUpdatedAt,
            createdBy: data.osCreatedBy,
            updatedBy: data.osUpdatedBy,
          };
          const groupDto = new GroupDto(group);
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
      .post(`${this.url}`, groupDto, {
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
      url: `${this.url}/${groupId}`,
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
    const template = {
      groupId: "osid",
      schoolId: "schoolId",
      name: "name",
      type: "type",
      status: "status",
      mediumOfInstruction: "mediumOfInstruction",
      image: "image",
      createdAt: "osCreatedAt",
      updatedAt: "osUpdatedAt",
      createdBy: "osCreatedBy",
      updatedBy: "osUpdatedBy",
    };
    return this.httpService
      .post(`${this.url}/search`, groupSearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((response) => {
          const responsedata = response.data.map((item: any) => {
            const groupDetailDto = new GroupDto(template);
            Object.keys(template).forEach((key) => {
              groupDetailDto[key] = resolvePath(item, template[key]);
            });
            return groupDetailDto;
          });

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
