import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { SuccessResponse } from "src/success-response";
import { MonitorTrackingDto } from "src/monitorTracking/dto/monitorTracking.dto";
@Injectable()
export class MonitorTrackingService {
  constructor(private httpService: HttpService) {}

  public async getMonitorTracking(monitorId: string, request: any) {
    var axios = require("axios");

    var data = {
      query: `query GetMonitorTracking($monitorTrackingId:uuid) {
        monitortracking(where: {monitorTrackingId: {_eq:$monitorTrackingId }}) {
          created_at
          feedback
          monitorTrackingId
          scheduleVisitDate
          schoolId
          monitorId
          status
          updated_at
          visitDate
          lastVisited
        }
      }`,
      variables: { monitorTrackingId: monitorId },
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

    let result = response.data.data.monitortracking.map(
      (item: any) => new MonitorTrackingDto(item)
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }
  public async createMonitorTracking(
    request: any,
    monitorTrackingDto: MonitorTrackingDto
  ) {
    var axios = require("axios");

    let newDataObject = "";
    Object.keys(monitorTrackingDto).forEach((e) => {
      if (monitorTrackingDto[e] && monitorTrackingDto[e] != "") {
        newDataObject += `${e}: "${monitorTrackingDto[e]}", `;
      }
    });
    var data = {
      query: `mutation CreateMonitorTracking {
        insert_monitortracking_one(object: {${newDataObject}}) {
          monitorTrackingId
        }
      }`,
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
    const result = response.data.data.insert_monitortracking_one;
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async updateMonitorTracking(
    monitorTrackingId: string,
    request: any,
    monitorTrackingDto: MonitorTrackingDto
  ) {
    var axios = require("axios");

    let newDataObject = "";
    Object.keys(monitorTrackingDto).forEach((e) => {
      if (monitorTrackingDto[e] && monitorTrackingDto[e] != "") {
        newDataObject += `${e}:"${monitorTrackingDto[e]}"`;
      }
    });

    var data = {
      query: `mutation UpdatedMonitorTracking($monitorTrackingId:uuid) {
        update_monitortracking(where: {monitorTrackingId: {_eq: $monitorTrackingId}}, _set: {${newDataObject}}) {
          affected_rows
        }
}`,
      variables: {
        monitorTrackingId: monitorTrackingId,
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

  public async searchMonitorTracking(
    limit: string,
    monitorTrackingId: string,
    monitorId: string,
    schoolId: string,
    groupId: string,
    scheduleVisitDate: Date,
    visitDate: Date,
    page: number,
    request: any
  ) {
    var axios = require("axios");
    let offset = 0;

    if (page > 1) {
      offset = parseInt(limit) * (page - 1);
    }
    const searchData = {
      monitorTrackingId,
      monitorId,
      schoolId,
      groupId,
      scheduleVisitDate,
      visitDate,
    };

    let newDataObject = "";
    Object.keys(searchData).forEach((e) => {
      if (searchData[e] && searchData[e] != "") {
        newDataObject += `${e}:{_eq:"${searchData[e]}"}`;
      }
    });

    var data = {
      query: `query SearchMonitorTracking($offset:Int,$limit:Int) {
            monitortracking(where:{ ${newDataObject}}, offset: $offset,limit: $limit) {
              created_at
              feedback
              monitorTrackingId
              scheduleVisitDate
              status
              schoolId
              groupId
              monitorId
              updated_at
              visitDate
              lastVisited
            }
          }`,
      variables: { limit: parseInt(limit), offset: offset },
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
    console.log(response.data);

    let result = response.data.data.monitortracking.map(
      (item: any) => new MonitorTrackingDto(item)
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }
}
