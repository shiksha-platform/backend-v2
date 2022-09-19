import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { SuccessResponse } from "src/success-response";
import { RoleDto } from "src/role/dto/role.dto";
@Injectable()
export class RoleService {
  constructor(private httpService: HttpService) {}

  public async getRole(title: string, request: any) {
    var axios = require("axios");
    var data = {
      query: `query getRole($title: String) {
      role(where: {title: {_eq: $title}}) {
        title
        roleId,
        status,
        parentId
        created_at
        updated_at
      }
    }`,
      variables: { title: title },
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

    let result = response.data.data.role;
    const roleData = await this.mappedResponse(result);
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: roleData,
    });
  }

  public async createRole(request: any, roleDto: RoleDto) {
    var axios = require("axios");
    var data = {
      query: `mutation createRole($title: String, $parentId: String, $status: String) {
      insert_role_one(object: {title: $title, parentId: $parentId, status: $status}) {
        roleId
      }
    }`,
      variables: {
        title: roleDto.title,
        parentId: roleDto.parentId,
        status: roleDto.status,
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

    const result = response.data.data.insert_role_one;
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async updateRole(roleId: string, request: any, roleDto: RoleDto) {
    var axios = require("axios");

    const updateRoleData = {
      title: roleDto.title,
      parentId: roleDto.parentId,
      status: roleDto.status,
    };

    let query = "";
    Object.keys(updateRoleData).forEach((e) => {
      if (updateRoleData[e] && updateRoleData[e] != "") {
        query += `${e}:${updateRoleData[e]} `;
      }
    });

    var data = {
      query: `mutation updateRole($roleId: uuid, $title: String, $parentId: String, $status: String) {
      update_role(where: {roleId: {_eq: $roleId}}, _set: {${query}}) {
        affected_rows
      }
    }`,
      variables: {
        roleId: roleId,
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

  public async searchRole(
    limit: string,
    roleId: string,
    title: string,
    parentId: string,
    status: string,
    request: any
  ) {
    var axios = require("axios");

    const searchData = {
      roleId,
      title,
      parentId,
      status,
    };

    let query = "";
    Object.keys(searchData).forEach((e) => {
      if (searchData[e] && searchData[e] != "") {
        query += `${e}:{_eq:"${searchData[e]}"}`;
      }
    });
    var data = {
      query: `query searchRole($limit:Int) {
        role_aggregate {
          aggregate {
            count
          }
        }
  role(limit: $limit, where: {${query}}) {
    title
    roleId,
    status,
    parentId
    created_at
    updated_at
  }
}`,
      variables: {
        limit: parseInt(limit),
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

    let result = response.data.data.role;
    const roleData = await this.mappedResponse(result);
    const count = response?.data?.data?.role_aggregate?.aggregate?.count;
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      totalCount: count,
      data: roleData,
    });
  }

  public async mappedResponse(result: any) {
    const roleResponse = result.map((item: any) => {
      const roleMapping = {
        id: item?.roleId ? `${item.roleId}` : "",
        roleId: item?.roleId ? `${item.roleId}` : "",
        title: item?.title ? `${item.title}` : "",
        parentId: item?.parentId ? `${item.parentId}` : "",
        status: item?.status ? `${item.status}` : "",
        createdAt: item?.created_at ? `${item.created_at}` : "",
        updatedAt: item?.updated_at ? `${item.updated_at}` : "",
      };
      return new RoleDto(roleMapping);
    });

    return roleResponse;
  }
}
