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

    let result = await this.mappedResponse(response.data.data.mentortracking);

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

    let query = "";
    Object.keys(mentorTrackingDto).forEach((e) => {
      if (mentorTrackingDto[e] && mentorTrackingDto[e] != "") {
        query += `${e}: "${mentorTrackingDto[e]}", `;
      }
    });
    var data = {
      query: `mutation createMentorTracking {
  insert_mentortracking_one(object: {${query}}) {
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
    const mentorSchema = new MentorTrackingDto(mentorTrackingDto);
    let query = "";
    Object.keys(mentorTrackingDto).forEach((e) => {
      if (
        mentorTrackingDto[e] &&
        mentorTrackingDto[e] != "" &&
        Object.keys(mentorSchema).includes(e)
      ) {
        if (Array.isArray(mentorTrackingDto[e])) {
          query += `${e}: ${JSON.stringify(mentorTrackingDto[e])}, `;
        } else {
          query += `${e}: "${mentorTrackingDto[e]}", `;
        }
      }
    });

    var axios = require("axios");
    var data = {
      query: `mutation updateMentorTracking($mentorTrackingId: uuid) {
  update_mentortracking(where: {mentorTrackingId: {_eq: $mentorTrackingId}}, _set: {${query}}) {
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
    page: number,
    status: string,
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
      status,
    };
    let offset = 0;

    if (page > 1) {
      offset = parseInt(limit) * (page - 1);
    }

    let query = "";
    Object.keys(searchData).forEach((e) => {
      if (searchData[e] && searchData[e] != "") {
        query += `${e}:{_eq:"${searchData[e]}"}`;
      }
    });

    var data = {
      query: `query searchMentorTracking($offset:Int,$limit:Int) {
  mentortracking(limit: $limit, offset: $offset, where: {${query}}) {
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

    let result = await this.mappedResponse(response.data.data.mentortracking);

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async mappedResponse(result: any) {
    const mentorResponse = result.map((obj: any) => {
      const mentorMapping = {
        mentorTrackingId: obj?.mentorTrackingId
          ? `${obj.mentorTrackingId}`
          : "",
        mentorId: obj?.mentorId ? `${obj.mentorId}` : "",
        teacherId: obj?.teacherId ? `${obj.teacherId}` : "",
        schoolId: obj?.schoolId ? `${obj.schoolId}` : "",
        scheduleVisitDate: obj?.scheduleVisitDate
          ? `${obj.scheduleVisitDate}`
          : "",
        visitDate: obj?.visitDate ? `${obj.visitDate}` : "",
        feedback: obj?.feedback ? `${obj.feedback}` : "",
        status: obj?.status ? obj.status : "",
        lastVisited: obj?.lastVisited ? obj.lastVisited : "",
        createdAt: obj?.created_at ? `${obj.created_at}` : "",
        updatedAt: obj?.updated_at ? `${obj.updated_at}` : "",
      };
      return new MentorTrackingDto(mentorMapping);
    });

    return mentorResponse;
  }
}
