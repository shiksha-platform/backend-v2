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
          status
          updated_at
          visitDate
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
    var data = {
      query: `mutation CreateMonitorTracking($schoolId:String,$scheduleVisit:date,$visitDate:date, $feedback:String, $status:String) {
        insert_monitortracking_one(object: {schoolId: $schoolId, scheduleVisitDate: $scheduleVisit, visitDate:$visitDate, feedback: $feedback, status: $status}) {
          monitorTrackingId
        }
      }`,
      variables: {
        schoolId: monitorTrackingDto.schoolId,
        scheduleVisit: monitorTrackingDto.scheduleVisitDate,
        visitDate: monitorTrackingDto.visitDate,
        feedback: monitorTrackingDto.feedback,
        status: monitorTrackingDto.status,
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
    const result = response.data.data.insert_monitortracking_one;
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async updateMonitorTracking(
    monitorId: string,
    request: any,
    monitorTrackingDto: MonitorTrackingDto
  ) {
    var axios = require("axios");
    var data = {
      query: `mutation MyMutation($monitorTrackingId:uuid,$scheduleVisitDate:date,$visitDate:date,$schoolId:String,$status:String,$feedback:String) {
        update_monitortracking(where: {monitorTrackingId: {_eq: $monitorTrackingId}}, _set: {visitDate:$visitDate, schoolId: $schoolId, status:$status, scheduleVisitDate: $scheduleVisitDate, feedback: $feedback}) {
          affected_rows
        }
}`,
      variables: {
        monitorTrackingId: monitorId,
        schoolId: monitorTrackingDto.schoolId,
        scheduleVisitDate: monitorTrackingDto.scheduleVisitDate,
        visitDate: monitorTrackingDto.visitDate,
        feedback: monitorTrackingDto.feedback,
        status: monitorTrackingDto.status,
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
    schoolId: string,
    scheduleVisitDate: Date,
    visitDate: Date,
    request: any
  ) {
    var axios = require("axios");

    const searchData = {
      monitorTrackingId,
      schoolId,
      scheduleVisitDate,
      visitDate,
    };

    let newDataObject = "";
    const newData = Object.keys(searchData).forEach((e) => {
      if (searchData[e] && searchData[e] != "") {
        newDataObject += `${e}:{_eq:"${searchData[e]}"}`;
      }
    });

    var data = {
      query: `query SearchMonitorTracking($limit:Int) {
            monitortracking(where:{ ${newDataObject}}, limit: $limit) {
              created_at
              feedback
              monitorTrackingId
              scheduleVisitDate
              status
              schoolId
              updated_at
              visitDate
            }
          }`,
      variables: { limit: parseInt(limit) },
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
}
