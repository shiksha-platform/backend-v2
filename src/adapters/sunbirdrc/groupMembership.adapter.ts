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
import { StudentDto } from "src/student/dto/student.dto";
import axios from "axios";
import { UserDto } from "src/user/dto/user.dto";
import { GroupDto } from "src/group/dto/group.dto";
import { IServicelocator } from "../groupmembershipservicelocator";
export const SunbirdGroupMembershipToken = "SunbirdGroupMembership";
@Injectable()
export class GroupMembershipService implements IServicelocator {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}`;

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
}
