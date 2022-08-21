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
    schoolId
    updated_at
    visitDate
    lastVisited
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

    let newDataObject = "";
    const newData = Object.keys(mentorTrackingDto).forEach((e) => {
      if (mentorTrackingDto[e] && mentorTrackingDto[e] != "") {
        newDataObject += `${e}: "${mentorTrackingDto[e]}", `;
      }
    });
    var data = {
      query: `mutation createMentorTracking {
  insert_mentortracking_one(object: {${newDataObject}}) {
    mentorTrackingId
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
    const result = response.data.data.insert_mentortracking_one;
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async updateMentorTracking(
    mentorTrackingId: string,
    request: any,
    mentorTrackingDto: MentorTrackingDto
  ) {
    let newDataObject = "";
    const newData = Object.keys(mentorTrackingDto).forEach((e) => {
      if (mentorTrackingDto[e] && mentorTrackingDto[e] != "") {
        newDataObject += `${e}:"${mentorTrackingDto[e]}" `;
      }
    });

    var axios = require("axios");
    var data = {
      query: `mutation updateMentorTracking($mentorTrackingId: uuid) {
  update_mentortracking(where: {mentorTrackingId: {_eq: $mentorTrackingId}}, _set: {${newDataObject}}) {
    affected_rows
  }
}`,
      variables: {
        mentorTrackingId: mentorTrackingId,
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
    schoolId: string,
    scheduleVisitDate: Date,
    visitDate: Date,
    request: any
  ) {
    var axios = require("axios");

    const searchData = {
      mentorTrackingId,
      mentorId,
      teacherId,
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
      query: `query searchMentorTracking($limit:Int) {
  mentortracking(limit: $limit, where: {${newDataObject}}) {
    mentorTrackingId
    created_at
    feedback
    mentorId
    scheduleVisitDate
    status
    teacherId
    schoolId
    updated_at
    visitDate
    lastVisited
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
