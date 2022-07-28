import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { SuccessResponse } from "src/success-response";
import { MentorTrackingDto } from "src/mentorTracking/dto/mentorTracking.dto";
@Injectable()
export class MentorTrackingService {
  constructor(private httpService: HttpService) {}

  public async getMentorTracking(mentorId: string, request: any) {
    var axios = require("axios");

    var data = {
      query: `query getMentorTracking($mentorTrackingId: uuid!) {
  mentortracking(where: {mentorTrackingId: {_eq: $mentorTrackingId}}) {
    mentorTrackingId
    created_at
    feedback
    mentorId
    scheduleVisitDate
    status
    teacherId
    updated_at
    visitDate
  }
}`,
      variables: { mentorTrackingId: mentorId },
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

    let result = response.data.data.mentortracking.map(
      (item: any) => new MentorTrackingDto(item)
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async createMentorTracking(
    request: any,
    mentorTrackingDto: MentorTrackingDto
  ) {
    var axios = require("axios");
    var data = {
      query: `mutation createMentorTracking($mentorId:String,$teacherId:String,$scheduleVisitDate:date,$visitDate:date,$status:String,$feedback:String) {
  insert_mentortracking_one(object: {mentorId: $mentorId, teacherId:$teacherId, scheduleVisitDate: $scheduleVisitDate, visitDate: $visitDate, status: $status, feedback:$feedback}) {
    mentorTrackingId
  }
}`,
      variables: {
        mentorId: mentorTrackingDto.mentorId,
        teacherId: mentorTrackingDto.teacherId,
        scheduleVisitDate: mentorTrackingDto.scheduleVisitDate,
        visitDate: mentorTrackingDto.visitDate,
        status: mentorTrackingDto.status,
        feedback: mentorTrackingDto.feedback,
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
    const result = response.data.data.insert_mentortracking_one;
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async updateMentorTracking(
    mentorId: string,
    request: any,
    mentorTrackingDto: MentorTrackingDto
  ) {
    var axios = require("axios");
    var data = {
      query: `mutation updateMentorTracking($mentorTrackingId: uuid, $mentorId: String, $teacherId: String, $scheduleVisitDate: date, $visitDate: date, $status: String, $feedback: String) {
  update_mentortracking(where: {mentorTrackingId: {_eq: $mentorTrackingId}}, _set: {mentorId: $mentorId, teacherId: $teacherId, status: $status, scheduleVisitDate: $scheduleVisitDate, visitDate: $visitDate, feedback: $feedback}) {
    affected_rows
  }
}`,
      variables: {
        mentorTrackingId: mentorId,
        mentorId: mentorTrackingDto.mentorId,
        teacherId: mentorTrackingDto.teacherId,
        scheduleVisitDate: mentorTrackingDto.scheduleVisitDate,
        visitDate: mentorTrackingDto.visitDate,
        status: mentorTrackingDto.status,
        feedback: mentorTrackingDto.feedback,
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

  public async searchMentorTracking(
    limit: string,
    mentorTrackingId: string,
    mentorId: string,
    teacherId: string,
    scheduleVisitDate: Date,
    visitDate: Date,
    request: any
  ) {
    var axios = require("axios");

    const searchData = {
      mentorTrackingId,
      mentorId,
      teacherId,
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
      query: `query searchMentorTracking($limit:Int) {
  mentortracking(limit: $limit, where: {${newDataObject}}) {
    mentorTrackingId
    created_at
    feedback
    mentorId
    scheduleVisitDate
    status
    teacherId
    updated_at
    visitDate
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

    let result = response.data.data.mentortracking.map(
      (item: any) => new MentorTrackingDto(item)
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }
}
