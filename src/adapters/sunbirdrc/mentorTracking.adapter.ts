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
  V_Mentortracking(where: {MentorTrackingId: {_eq: $mentorTrackingId}}) {
    MentorTrackingId
    createdAt
    feedback
    mentorId
    scheduleVisitDate
    status
    teacherId
    updatedAt
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

    let result = response.data.data.V_Mentortracking.map(
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
  insert_V_Mentortracking_one(object: {mentorId: $mentorId, teacherId:$teacherId, scheduleVisitDate: $scheduleVisitDate, visitDate: $visitDate, status: $status, feedback:$feedback}) {
    MentorTrackingId
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
    const result = response.data.data.insert_V_Mentortracking_one;
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
      query: `mutation updateMentorTracking($MentorTrackingId: uuid, $mentorId: String, $teacherId: String, $scheduleVisitDate: date, $visitDate: date, $status: String, $feedback: String) {
  update_V_Mentortracking(where: {MentorTrackingId: {_eq: $MentorTrackingId}}, _set: {mentorId: $mentorId, teacherId: $teacherId, status: $status, scheduleVisitDate: $scheduleVisitDate, visitDate: $visitDate, feedback: $feedback}) {
    affected_rows
  }
}`,
      variables: {
        MentorTrackingId: mentorId,
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
    request: any
  ) {
    var axios = require("axios");

    var data = {
      query: `query searchMentorTracking($limit:Int,$mentorTrackingId: uuid, $mentorId: String, $teacherId: String) {
  V_Mentortracking(limit: $limit, where: {_and: {MentorTrackingId: {_eq: $mentorTrackingId}, _and: {mentorId: {_eq: $mentorId}}, teacherId: {_eq: $teacherId}}}) {
    MentorTrackingId
    createdAt
    feedback
    mentorId
    scheduleVisitDate
    status
    teacherId
    updatedAt
    visitDate
  }
}`,
      variables: {
        limit: parseInt(limit),
        mentorTrackingId: mentorTrackingId,
        mentorId: mentorId,
        teacherId: teacherId,
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

    let result = response.data.data.V_Mentortracking.map(
      (item: any) => new MentorTrackingDto(item)
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }
}
