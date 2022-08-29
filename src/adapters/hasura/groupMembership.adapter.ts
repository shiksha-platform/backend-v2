import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
const resolvePath = require("object-resolve-path");
import { GroupMembershipDto } from "src/groupMembership/dto/groupMembership.dto";
import { GroupMembershipSearchDto } from "src/groupMembership/dto/groupMembership-search.dto";

@Injectable()
export class GroupMembershipService {
  constructor(private httpService: HttpService) {}

  url = `${process.env.BASEAPIURL}`;

  public async getGroupMembership(groupMembershipId: any, request: any) {
    var axios = require("axios");

    var data = {
      query: `query GetGroupMembership($groupmembershipId:uuid!) {
        groupmembership_by_pk(groupmembershipId: $groupmembershipId) {
            created_at
            created_by
            groupId
            groupMembershipId
            schoolId
            role
            updated_at
            updated_by
            userId
      }
    }`,
      variables: {
        groupMembershipId: groupMembershipId,
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

    let result = new GroupMembershipDto(
      response?.data?.data?.groupmembership_by_pk
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async createGroupMembership(
    request: any,
    groupMembership: GroupMembershipDto
  ) {
    var axios = require("axios");

    let query = "";
    Object.keys(groupMembership).forEach((e) => {
      if (groupMembership[e] && groupMembership[e] != "") {
        if (Array.isArray(groupMembership[e])) {
          query += `${e}: ${JSON.stringify(groupMembership[e])}, `;
        } else {
          query += `${e}: "${groupMembership[e]}", `;
        }
      }
    });

    var data = {
      query: `mutation CreateGroupMembership {
        insert_groupmembership_one(object: {${query}}) {
         groupMembershipId
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

    const result = response.data.data.insert_groupmembership_one;

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async updateGroupMembership(
    groupMembershipId: string,
    request: any,
    groupMembershipDto: GroupMembershipDto
  ) {
    var axios = require("axios");

    let query = "";
    Object.keys(groupMembershipDto).forEach((e) => {
      if (groupMembershipDto[e] && groupMembershipDto[e] != "") {
        if (Array.isArray(groupMembershipDto[e])) {
          query += `${e}: ${JSON.stringify(groupMembershipDto[e])}, `;
        } else {
          query += `${e}: ${groupMembershipDto[e]}, `;
        }
      }
    });

    var data = {
      query: `mutation UpdateGroupMembership($groupMembershipId:uuid) {
          update_groupmembership(where: { groupMembershipId: {_eq: $ groupMembershipId}}, _set: {${query}}) {
          affected_rows
        }
}`,
      variables: {
        groupMembershipId: groupMembershipId,
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

  public async searchGroupMembership(
    request: any,
    groupMembershipSearchDto: GroupMembershipSearchDto
  ) {
    var axios = require("axios");

    let offset = 0;
    if (groupMembershipSearchDto.page > 1) {
      offset =
        parseInt(groupMembershipSearchDto.limit) *
        (groupMembershipSearchDto.page - 1);
    }

    let filters = groupMembershipSearchDto.filters;

    Object.keys(groupMembershipSearchDto.filters).forEach((item) => {
      Object.keys(groupMembershipSearchDto.filters[item]).forEach((e) => {
        if (!e.startsWith("_")) {
          filters[item][`_${e}`] = filters[item][e];
          delete filters[item][e];
        }
      });
    });
    var data = {
      query: `query SearchGroupMembership($filters:groupmembership_bool_exp,$limit:Int, $offset:Int) {
           groupmembership(where:$filters, limit: $limit, offset: $offset,) {
            created_at
            created_by
            groupId
            groupMembershipId
            schoolId
            role
            updated_at
            updated_by
            userId
            }
          }`,
      variables: {
        limit: parseInt(groupMembershipSearchDto.limit),
        offset: offset,
        filters: groupMembershipSearchDto.filters,
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

    let result = response.data.data.groupmembership.map(
      (item: any) => new GroupMembershipDto(item)
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }
}
