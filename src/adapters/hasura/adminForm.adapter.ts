import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";

import { AdminFormDto } from "src/adminForm/dto/adminForm.dto";
import { AdminFormSearchDto } from "src/adminForm/dto/adminForm-search.dto";
import { IServicelocator } from "../adminformservicelocator";

@Injectable()
export class HasuraAdminFormService implements IServicelocator {
  constructor(private httpService: HttpService) {}

  public async getAdminForm(adminFormId: string, request: any) {
    var axios = require("axios");

    var data = {
      query: `query GetAdminForm($adminFormId:uuid!) {
        adminform_by_pk(adminFormId: $adminFormId) {
            moduleId
            formSchema
            created_at
            adminFormId
            updated_at
          
        }
      }
      `,
      variables: { adminFormId: adminFormId },
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

    let result = [response.data.data.adminform_by_pk];
    const adminFormData = await this.mappedResponse(result);
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: adminFormData[0],
    });
  }

  public async createAdminForm(request: any, adminFormDto: AdminFormDto) {
    var axios = require("axios");

    const adminFormSchema = new AdminFormDto(adminFormDto);
    let query = "";
    Object.keys(adminFormDto).forEach((e) => {
      if (
        adminFormDto[e] &&
        adminFormDto[e] != "" &&
        Object.keys(adminFormSchema).includes(e)
      ) {
        if (Array.isArray(adminFormDto[e])) {
          query += `${e}: ${JSON.stringify(adminFormDto[e])}, `;
        } else {
          query += `${e}: ${JSON.stringify(adminFormDto[e])}, `;
        }
      }
    });

    var data = {
      query: `mutation CreateAdminForm {
        insert_adminform_one(object: {${query}}) {
         adminFormId
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

    const result = response.data.data.insert_adminform_one;

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async updateAdminForm(
    adminFormId: string,
    request: any,
    adminFormDto: AdminFormDto
  ) {
    var axios = require("axios");

    const adminFormSchema = new AdminFormDto(adminFormDto);
    let query = "";
    Object.keys(adminFormDto).forEach((e) => {
      if (
        adminFormDto[e] &&
        adminFormDto[e] != "" &&
        Object.keys(adminFormSchema).includes(e)
      ) {
        if (Array.isArray(adminFormDto[e])) {
          query += `${e}: ${JSON.stringify(adminFormDto[e])}, `;
        } else {
          query += `${e}: ${JSON.stringify(adminFormDto[e])}, `;
        }
      }
    });

    var data = {
      query: `mutation UpdateAdminForm($adminFormId:uuid) {
          update_adminform(where: {adminFormId: {_eq: $adminFormId}}, _set: {${query}}) {
          affected_rows
        }}`,
      variables: {
        adminFormId: adminFormId,
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

  public async searchAdminForm(
    request: any,
    adminFormSearchDto: AdminFormSearchDto
  ) {
    var axios = require("axios");

    let offset = 0;
    if (adminFormSearchDto.page > 1) {
      offset =
        parseInt(adminFormSearchDto.limit) * (adminFormSearchDto.page - 1);
    }

    let filters = adminFormSearchDto.filters;

    Object.keys(adminFormSearchDto.filters).forEach((item) => {
      Object.keys(adminFormSearchDto.filters[item]).forEach((e) => {
        if (!e.startsWith("_")) {
          filters[item][`_${e}`] = filters[item][e];
          delete filters[item][e];
        }
      });
    });
    var data = {
      query: `query SearchAdminForm($filters:adminform_bool_exp,$limit:Int, $offset:Int) {
        adminform_aggregate {
          aggregate {
            count
          }
        }
          adminform(where:$filters, limit: $limit, offset: $offset,) {
            moduleId
            formSchema
            created_at
            adminFormId
            updated_at
            }
          }`,
      variables: {
        limit: parseInt(adminFormSearchDto.limit),
        offset: offset,
        filters: adminFormSearchDto.filters,
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

    let result = response.data.data.adminform;
    const adminformData = await this.mappedResponse(result);
    const count = response?.data?.data?.adminform_aggregate?.aggregate?.count;
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      totalCount: count,
      data: adminformData,
    });
  }

  public async mappedResponse(result: any) {
    const adminFormResponse = result.map((obj: any) => {
      const adminFormMapping = {
        adminFormId: obj?.adminFormId ? `${obj.adminFormId}` : "",
        moduleId: obj?.moduleId ? `${obj.moduleId}` : "",
        formSchema: obj?.formSchema ? `${obj.formSchema}` : "",
        createdAt: obj?.created_at ? `${obj.created_at}` : "",
        updatedAt: obj?.updated_at ? `${obj.updated_at}` : "",
      };
      return new AdminFormDto(adminFormMapping);
    });

    return adminFormResponse;
  }
}
