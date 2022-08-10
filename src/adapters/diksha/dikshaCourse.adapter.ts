import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { IServicelocator } from "../courseservicelocator";

export const DikshaCourseToken = "DikshaCourse";
@Injectable()
export class DikshaCourseService implements IServicelocator {
  constructor(private httpService: HttpService) {}
  url = process.env.DIKSHADEVBASEAPIURL;
  public async getAllCourse(
    subject: [string],
    audience: [string],
    className: [string],
    medium: [string],
    limit: string,
    request: any
  ) {
    var axios = require("axios");

    var axios = require("axios");
    var data = {
      request: {
        filters: {
          subject: [subject],
          audience: [audience],
          contentType: ["Course"],
          primaryCategory: ["Course"],
          "batches.enrollmentType": "open",
          "batches.status": 1,
          status: ["Live"],
          se_gradeLevels: [className],
          se_mediums: [medium],
        },
        limit: limit,
        fields: [
          "name",
          "appIcon",
          "mimeType",
          "gradeLevel",
          "identifier",
          "medium",
          "pkgVersion",
          "board",
          "subject",
          "resourceType",
          "contentType",
          "channel",
          "organisation",
          "trackable",
          "se_boards",
          "se_subjects",
          "se_mediums",
          "se_gradeLevels",
        ],
        facets: ["se_subjects"],
      },
    };

    var config = {
      method: "post",
      url: "https://preprod.ntp.net.in/api/content/v1/search?orgdetails=orgName,email&framework=ncert_k-12",
      data: data,
    };

    const response = await axios(config);

    const responseData = response.data.result.content;
    let arrayIds = responseData.map((e: any) => {
      return e.identifier;
    });

    let courseArray = [];
    for (let value of arrayIds) {
      let courseData = this.getCourse(value);
      courseArray.push(await courseData);
    }

    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: courseArray,
    });
  }

  public async getCourse(value: any) {
    var axios = require("axios");

    let config = {
      method: "get",
      url: `https://preprod.ntp.net.in/api/content/v1/read/${value}`,
    };

    const response = await axios(config);

    const data = response?.data;

    const final = data.result.content;

    const mappedResponse = {
      topic: final.topic,

      subject: final.subject,

      subjectIds: final.subjectIds,

      class: final.gradeLevel,

      name: final.name,

      gradeId: final.se_gradeLevelIds,

      medium: final.targetMediumIds,

      courseId: final.identifier,

      visibility: final.visibility,

      learningOutcome: final.learningOutcome,

      compatibilityLevel: final.compatibilityLevel,

      board: final.se_boards,

      boardIds: final.targetBoardIds,

      language: final.language,

      audience: final.audience,

      downloadUrl: final.downloadUrl,

      batches: final.batches,

      idealScreenSize: final.batches,

      posterImage: final.posterImage,

      description: final.description,

      mediaType: final.mediaType,

      timeLimits: final.timeLimits,

      variants: final.variants,

      primaryCategory: final.primaryCategory,

      appId: final.appId,

      contentEncoding: final.contentEncoding,

      totalCompressedSize: final.totalCompressedSize,

      mimeTypesCount: final.mimeTypesCount,

      os: final.os,

      contentDisposition: final.contentDisposition,
    };

    return mappedResponse;
  }

  public async getCoursesByIds(courseIds: [string], request: any) {
    let courseArray = [];
    for (let value of courseIds) {
      let courseData = this.getCourse(value);
      courseArray.push(await courseData);
    }
    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: courseArray,
    });
  }

  public async getCourseDetail(questionId: string, request: any) {
    let value = questionId;
    let courseData = await this.getCourse(value);
    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: courseData,
    });
  }
}
