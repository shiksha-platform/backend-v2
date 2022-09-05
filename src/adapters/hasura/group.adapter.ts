import { Injectable, HttpException } from "@nestjs/common";
import { GroupInterface } from "../../group/interfaces/group.interface";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { first, map, Observable } from "rxjs";
import e, { response } from "express";
import { SuccessResponse } from "src/success-response";
const resolvePath = require("object-resolve-path");
import { GroupDto } from "src/group/dto/group.dto";
import { ErrorResponse } from "src/error-response";
import { GroupSearchDto } from "src/group/dto/group-search.dto";
import { IServicelocatorgroup } from "../groupservicelocator";
import { UserDto } from "src/user/dto/user.dto";
import { StudentDto } from "src/student/dto/student.dto";
import { isArray } from "class-validator";
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
        parentId
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

    let filters = groupSearchDto.filters;

    const newdata = Object.keys(groupSearchDto.filters).forEach((item) => {
      Object.keys(groupSearchDto.filters[item]).forEach((e) => {
        if (!e.startsWith("_")) {
          filters[item][`_${e}`] = filters[item][e];
          delete filters[item][e];
        }
      });
    });
    var data = {
      query: `query SearchGroup($filters:group_bool_exp,$limit:Int, $offset:Int) {
           group(where:$filters, limit: $limit, offset: $offset,) {
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
                parentId
            }
          }`,
      variables: {
        limit: parseInt(groupSearchDto.limit),
        offset: offset,
        filters: groupSearchDto.filters,
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

  public async findMembersOfGroup(groupId: string, role: string, request: any) {
    let axios = require("axios");
    let userData = [];
    var findMember = {
      query: `query GetGroupMembership($groupId:uuid,$role:String) {
       groupmembership(where: {groupId: {_eq: $groupId}, role: {_eq: $role}}) {
        userId
        role
        }
      }`,
      variables: {
        groupId: groupId,
        role: role,
      },
    };

    var getMemberData = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: findMember,
    };

    const response = await axios(getMemberData);
    let result = response.data.data.groupmembership;
    if (Array.isArray(result)) {
      let userIds = result.map((e: any) => {
        return e.userId;
      });
      if (result[0].role == "Student") {
        for (let value of userIds) {
          let studentSearch = {
            method: "get",
            url: `${this.url}/Student/${value}`,
            headers: {
              Authorization: request.headers.authorization,
            },
          };

          const response = await axios(studentSearch);
          let studentData = new StudentDto(response.data);

          userData.push(studentData);
        }
      } else {
        for (let value of userIds) {
          let classFinal = {
            method: "get",
            url: `${this.url}/User/${value}`,
            headers: {
              Authorization: request.headers.authorization,
            },
          };

          const responseData = await axios(classFinal);

          const teacherDetailDto = new UserDto(responseData.data);
          userData.push(teacherDetailDto);
        }
      }

      return new SuccessResponse({
        statusCode: 200,
        message: "ok",
        data: userData,
      });
    } else {
      return new SuccessResponse({
        statusCode: 200,
        message: "ok",
        data: { msg: "Unable to get data !!" },
      });
    }
  }

  public async findGroupsByUserId(userId: string, role: string, request: any) {
    let axios = require("axios");
    var findMember = {
      query: `query GetGroup($userId:String,$role:String) {
        groupmembership(where: {userId: {_eq: $userId}, role: {_eq: $role}}) {
          group {
            created_at
            deactivationReason
            gradeLevel
            groupId
            image
            mediumOfInstruction
            metaData
            name
            option
            schoolId
            section
            status
            teacherId
            type
            updated_at
            parentId
          }
        }
      }
      `,
      variables: {
        userId: userId,
        role: role,
      },
    };

    var getMemberData = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: findMember,
    };
    const response = await axios(getMemberData);
    let groupData = response.data.data.groupmembership;
    let result = groupData.map((item: any) => new GroupDto(item.group));

    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: result,
    });
  }

  public async findMembersOfChildGroup(
    parentId: string,
    role: string,
    request: any
  ) {
    let axios = require("axios");
    let userData = [];

    var findParentId = {
      query: `query GetGroupParentId($parentId:String) {
       group(where: {parentId: {_eq: $parentId}}) {
        groupId
        }
      }`,
      variables: {
        parentId: parentId,
      },
    };

    var getParentId = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: findParentId,
    };

    const groupResponse = await axios(getParentId);

    let groupIds = groupResponse.data.data.group.map((e: any) => {
      return e.groupId;
    });

    for (let groupId of groupIds) {
      var findMember = {
        query: `query GetGroupMembership($groupId:uuid,$role:String) {
       groupmembership(where: {groupId: {_eq: $groupId}, role: {_eq: $role}}) {
        userId
        role
        }
      }`,
        variables: {
          groupId: groupId,
          role: role,
        },
      };

      var getMemberData = {
        method: "post",
        url: process.env.REGISTRYHASURA,
        headers: {
          "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
          "Content-Type": "application/json",
        },
        data: findMember,
      };

      const response = await axios(getMemberData);
      let result = response.data.data.groupmembership[0];

      if (result.role == "Student") {
        let studentSearch = {
          method: "get",
          url: `${this.url}/Student/${result.userId}`,
          headers: {
            Authorization: request.headers.authorization,
          },
        };

        const response = await axios(studentSearch);
        let studentData = new StudentDto(response.data);

        userData.push(studentData);
      } else {
        let classFinal = {
          method: "get",
          url: `${this.url}/User/${result.userId}`,
          headers: {
            Authorization: request.headers.authorization,
          },
        };

        const responseData = await axios(classFinal);
        const teacherDetailDto = new UserDto(responseData.data);
        userData.push(teacherDetailDto);
      }
    }
    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: userData,
    });
  }
}
