import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { WorkHistoryDto } from "../workHistory/dto/work-history.dto";

@Injectable()
export class WorkHistoryService {
  constructor(private httpService: HttpService) {}
  userUrl = `${process.env.BASEAPIURL}/User`;

  public async createWorkHistory(request: any, workHistoryDto: WorkHistoryDto) {
    var axios = require("axios");

    let newDataObject = "";
    const newData = Object.keys(workHistoryDto).forEach((e) => {
      if (workHistoryDto[e] && workHistoryDto[e] != "") {
        newDataObject += `${e}: "${workHistoryDto[e]}", `;
      }
    });

    var data = {
      query: `mutation CreateWorkHistory {
        insert_workhistory_one(object: {${newDataObject}}) {
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

    let newDataObject = "";
    const newData = Object.keys(workHistoryDto).forEach((e) => {
      if (workHistoryDto[e] && workHistoryDto[e] != "") {
        newDataObject += `${e}: "${workHistoryDto[e]}", `;
      }
    });

    var data = {
      query: `mutation UpdateWorkHistory($workHistoryId:uuid) {
          update_workhistory(where: {workHistoryId: {_eq: $worksHitoryId}}, _set: {${newDataObject}}) {
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
    let result = response?.data?.data?.workhistory.map(
      (item: any) => new WorkHistoryDto(item)
    );

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

    let newDataObject = "";
    const newData = Object.keys(searchData).forEach((e) => {
      if (searchData[e] && searchData[e] != "") {
        newDataObject += `${e}:{_eq:"${searchData[e]}"}`;
      }
    });

    var data = {
      query: `query SearchWorkHistory($limit:Int, $offset:Int) {
            workhistory(where:{ ${newDataObject}}, limit: $limit, offset: $offset,) {
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
    let result = response.data.data.workhistory.map(
      (item: any) => new WorkHistoryDto(item)
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }
}
