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
      url: "https://diksha.gov.in/api/content/v1/search?orgdetails=orgName,email&framework=ekstep_ncert_k-12",
      data: data,
    };

    const response = await axios(config);

    const responseData = response.data.result.content;
    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: responseData,
    });
  }

  public async getCourseContent(value: any) {
    var axios = require("axios");

    let config = {
      method: "get",
      url: `https://diksha.gov.in/api/content/v1/read/${value}?fields=transcripts,ageGroup,appIcon,artifactUrl,attributions,attributions,audience,author,badgeAssertions,board,body,channel,code,concepts,contentCredits,contentType,contributors,copyright,copyrightYear,createdBy,createdOn,creator,creators,description,displayScore,domain,editorState,flagReasons,flaggedBy,flags,framework,gradeLevel,identifier,itemSetPreviewUrl,keywords,language,languageCode,lastUpdatedOn,license,mediaType,medium,mimeType,name,originData,osId,owner,pkgVersion,publisher,questions,resourceType,scoreDisplayConfig,status,streamingUrl,subject,template,templateId,totalQuestions,totalScore,versionKey,visibility,year,primaryCategory,additionalCategories,interceptionPoints,interceptionType&licenseDetails=name,description,url`,
    };

    const response = await axios(config);

    const data = response?.data;

    const final = data.result.content;

    return final;
  }

  public async getCoursesByIds(courseIds: [string], request: any) {
    let courseArray = [];
    for (let value of courseIds) {
      let courseData = this.getCourseHierarchy(value);
      courseArray.push(await courseData);
    }
    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: courseArray,
    });
  }

  public async getCourseDetail(courseId: string, request: any) {
    let value = courseId;
    let courseData = await this.getCourseHierarchy(value);
    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: courseData,
    });
  }

  public async getCourseHierarchy(value: any) {
    var axios = require("axios");

    let config = {
      method: "get",
      url: `https://diksha.gov.in/api/course/v1/hierarchy/${value}?orgdetails=orgName,email&licenseDetails=name,description,url`,
    };

    const response = await axios(config);

    const data = response?.data;

    const final = data.result.content;

    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: final,
    });
  }
}
