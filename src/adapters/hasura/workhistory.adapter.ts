import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { WorkHistoryDto } from "../../workHistory/dto/work-history.dto";

@Injectable()
export class WorkHistoryService {
  constructor(private httpService: HttpService) {}
  userUrl = `${process.env.BASEAPIURL}/User`;

  public async createWorkHistory(request: any, workHistoryDto: WorkHistoryDto) {
    var axios = require("axios");

    let query = "";
    Object.keys(workHistoryDto).forEach((e) => {
      if (workHistoryDto[e] && workHistoryDto[e] != "") {
        query += `${e}: "${workHistoryDto[e]}", `;
      }
    });

    var data = {
      query: `mutation CreateWorkHistory {
        insert_workhistory_one(object: {${query}}) {
         workHistoryId
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

    const result = response.data.data.insert_workhistory_one;

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async updateWorkHistory(
    id: string,
    request: any,
    workHistoryDto: WorkHistoryDto
  ) {
    var axios = require("axios");

    let query = "";
    Object.keys(workHistoryDto).forEach((e) => {
      if (workHistoryDto[e] && workHistoryDto[e] != "") {
        query += `${e}: "${workHistoryDto[e]}", `;
      }
    });

    var data = {
      query: `mutation UpdateWorkHistory($workHistoryId:uuid) {
          update_workhistory(where: {workHistoryId: {_eq: $worksHitoryId}}, _set: {${query}}) {
          affected_rows
        }
}`,
      variables: {
        workHistoryId: id,
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

  public async getWorkHistory(workHistoryId: any, request: any) {
    var axios = require("axios");

    var data = {
      query: `query GetWorkHistory($workHistoryId:uuid) {
        workhistory(where: {workHistoryId: {_eq: $workHistoryId}}) {
          workHistoryId
          cadre
          created_at
          dateOfJoining
          dateOfOrder
          dateOfRelieving
          joiningDesignation
          leavingDesignation
          modeOfPosting
          placeOfPosting
          reason
          remark
          role
          transferOrderNumber
          updated_at
          userId
          organizationName
        }
      }
      `,
      variables: { workHistoryId: workHistoryId },
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
    let result = await this.mappedResponse(response?.data?.data?.workhistory);
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async searchWorkHistory(
    limit: string,
    workHistoryId: string,
    userId: string,
    dateOfJoining: string,
    dateOfRelieving: string,
    page: number,
    request: any
  ) {
    var axios = require("axios");

    let offset = 0;
    if (page > 1) {
      offset = parseInt(limit) * (page - 1);
    }

    const searchData = {
      workHistoryId: workHistoryId,
      userId: userId,
      dateOfJoining: dateOfJoining,
      dateOfRelieving: dateOfRelieving,
    };

    let query = "";
    Object.keys(searchData).forEach((e) => {
      if (searchData[e] && searchData[e] != "") {
        query += `${e}:{_eq:"${searchData[e]}"}`;
      }
    });

    var data = {
      query: `query SearchWorkHistory($limit:Int, $offset:Int) {
            workhistory(where:{ ${query}}, limit: $limit, offset: $offset,) {
              workHistoryId
              cadre
              created_at
              dateOfJoining
              dateOfOrder
              dateOfRelieving
              joiningDesignation
              leavingDesignation
              modeOfPosting
              placeOfPosting
              reason
              remark
              role
              transferOrderNumber
              updated_at
              userId
              organizationName
            }
          }`,
      variables: {
        limit: parseInt(limit),
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

    let result = await this.mappedResponse(response.data.data.workhistory);
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async mappedResponse(result: any) {
    const workHistoryResponse = result.map((obj: any) => {
      const workHistoryMapping = {
        workHistoryId: obj?.workHistoryId ? `${obj.workHistoryId}` : "",
        userId: obj?.userId ? `${obj.userId}` : "",
        role: obj?.role ? `${obj.role}` : "",
        joiningDesignation: obj?.joiningDesignation
          ? `${obj.joiningDesignation}`
          : "",
        leavingDesignation: obj?.leavingDesignation
          ? `${obj.leavingDesignation}`
          : "",
        dateOfJoining: obj?.dateOfJoining ? obj.dateOfJoining : "",
        dateOfRelieving: obj?.dateOfRelieving ? obj.dateOfRelieving : "",
        reason: obj?.reason ? `${obj.reason}` : "",
        remark: obj?.remark ? `${obj.remark}` : "",
        cadre: obj?.cadre ? `${obj.cadre}` : "",
        transferOrderNumber: obj?.transferOrderNumber
          ? `${obj.transferOrderNumber}`
          : "",
        placeOfPosting: obj?.placeOfPosting ? `${obj.placeOfPosting}` : "",
        dateOfOrder: obj?.dateOfOrder ? obj.dateOfOrder : "",
        modeOfPosting: obj?.modeOfPosting ? `${obj.modeOfPosting}` : "",
        organizationName: obj?.organizationName
          ? `${obj.organizationName}`
          : "",
        createdAt: obj?.created_at ? `${obj.created_at}` : "",
        updatedAt: obj?.updated_at ? `${obj.updated_at}` : "",
      };
      return new WorkHistoryDto(workHistoryMapping);
    });

    return workHistoryResponse;
  }
}
