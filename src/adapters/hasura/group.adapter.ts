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
import { UserDto } from "src/user/dto/user.dto";
import { StudentDto } from "src/student/dto/student.dto";
export const HasuraGroupToken = "HasuraGroup";
@Injectable()
export class HasuraGroupService implements IServicelocatorgroup {
  private group: GroupInterface;

  constructor(private httpService: HttpService) {}

  url = `${process.env.BASEAPIURL}`;

  public async getGroup(groupId: any, request: any) {
    var axios = require("axios");

    var data = {
      query: `query GetGroup($groupId:uuid!) {
        group_by_pk(groupId: $groupId) {
        groupId
        deactivationReason
        created_at
        image
        mediumOfInstruction
        metaData
        name
        option
        schoolId
        section
        teacherId
        gradeLevel
        status
        type
        updated_at
      }
    }`,
      variables: {
        groupId: groupId,
      },
    };

    var config = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);

    let result = new GroupDto(response?.data?.data?.group_by_pk);

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async createGroup(request: any, groupDto: GroupDto) {
    var axios = require("axios");

    let newDataObject = "";
    const newData = Object.keys(groupDto).forEach((e) => {
      if (groupDto[e] && groupDto[e] != "") {
        if (Array.isArray(groupDto[e])) {
          newDataObject += `${e}: ${JSON.stringify(groupDto[e])}, `;
        } else {
          newDataObject += `${e}: "${groupDto[e]}", `;
        }
      }
    });

    var data = {
      query: `mutation CreateGroup {
        insert_group_one(object: {${newDataObject}}) {
         groupId
        }
      }
      `,
      variables: {},
    };

    var config = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);

    const result = response.data.data.insert_group_one;

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async updateGroup(groupId: string, request: any, groupDto: GroupDto) {
    var axios = require("axios");
    var axios = require("axios");

    let newDataObject = "";
    const newData = Object.keys(groupDto).forEach((e) => {
      if (groupDto[e] && groupDto[e] != "") {
        if (Array.isArray(groupDto[e])) {
          newDataObject += `${e}: ${JSON.stringify(groupDto[e])}, `;
        } else {
          newDataObject += `${e}: ${groupDto[e]}, `;
        }
      }
    });

    var data = {
      query: `mutation UpdateGroup($groupId:uuid) {
          update_group(where: {groupId: {_eq: $groupId}}, _set: {${newDataObject}}) {
          affected_rows
        }
}`,
      variables: {
        groupId: groupId,
      },
    };

    var config = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);

    const result = response.data.data;

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async searchGroup(request: any, groupSearchDto: GroupSearchDto) {
    var axios = require("axios");

    let offset = 0;
    if (groupSearchDto.page > 1) {
      offset = parseInt(groupSearchDto.limit) * (groupSearchDto.page - 1);
    }

    let newDataObject = "";
    const newData = Object.keys(groupSearchDto.filters).forEach((e) => {
      if (groupSearchDto.filters[e] && groupSearchDto.filters[e] != "") {
        newDataObject += `${e}:{_eq:"${groupSearchDto.filters[e]}"}`;
      }
    });

    var data = {
      query: `query SearchGroup($limit:Int, $offset:Int) {
           group(where:{ ${newDataObject}}, limit: $limit, offset: $offset,) {
                groupId
                deactivationReason
                created_at
                image
                mediumOfInstruction
                metaData
                name
                option
                schoolId
                section
                status
                teacherId
                gradeLevel
                type
                updated_at
            }
          }`,
      variables: {
        limit: parseInt(groupSearchDto.limit),
        offset: offset,
      },
    };
    var config = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);

    let result = response.data.data.group.map(
      (item: any) => new GroupDto(item)
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async findMembersOfGroup(id: string, role: string, request: any) {
    let axios = require("axios");
    if (role == "Student") {
      let data = {
        filters: {
          groupId: {
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
      var data = {
        query: `query GetGroup($groupId:uuid) {
       group(where: {groupId: {_eq: $groupId}}) {
          groupId
          deactivationReason
          created_at
          image
          mediumOfInstruction
          metaData
          name
          option
          schoolId
          section
          status
          type
          teacherId
          gradeLevel
          updated_at
        }
      }`,
        variables: {
          groupId: id,
        },
      };

      var config = {
        method: "post",
        url: process.env.REGISTRYHASURA,
        headers: {
          "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios(config);

      let result = response?.data?.data?.group.map(
        (item: any) => new GroupDto(item)
      );

      let resData = [];
      if (result[0]?.teacherId) {
        let classFinal = {
          method: "get",
          url: `${this.url}/User/${result[0].teacherId}`,
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
    let axios = require("axios");
    let responseData = [];

    if (role === "Teacher") {
      var data = {
        query: `query GetGroup($teacherId:String) {
           group(where: {teacherId: {_eq: $teacherId}}) {
              groupId
              deactivationReason
              created_at
              image
              mediumOfInstruction
              metaData
              name
              option
              schoolId
              section
              status
              type
              teacherId
              gradeLevel
              updated_at
            }
          }`,
        variables: {
          teacherId: id,
        },
      };

      var config = {
        method: "post",
        url: process.env.REGISTRYHASURA,
        headers: {
          "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios(config);

      responseData = response.data.data.group;
    } else if (role === "Student") {
      const config = {
        method: "get",
        url: `${this.url}/Student/${id}`,
        headers: {
          Authorization: request.headers.authorization,
        },
      };

      const response = await axios(config);

      let studentObj = response?.data;

      if (studentObj?.groupId) {
        var queryData = {
          query: `query GetGroup($groupId:uuid) {
           group(where: {groupId: {_eq: $groupId}}) {
              groupId
              deactivationReason
              created_at
              image
              mediumOfInstruction
              metaData
              name
              option
              schoolId
              section
              teacherId
              gradeLevel
              status
              type
              updated_at
            }
          }`,
          variables: {
            groupId: studentObj.groupId,
          },
        };

        var groupCall = {
          method: "post",
          url: process.env.REGISTRYHASURA,
          headers: {
            "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
            "Content-Type": "application/json",
          },
          data: queryData,
        };

        const resData = await axios(groupCall);

        responseData = resData?.data?.data?.group[0]
          ? [resData.data.data.group[0]]
          : [];
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
