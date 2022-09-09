import { HttpService } from "@nestjs/axios";
import { Injectable, HttpException } from "@nestjs/common";
const resolvePath = require("object-resolve-path");
import { AxiosResponse } from "axios";
import { LessonPlanDto } from "src/lessonPlan/dto/lessonPlan.dto";
import { map } from "rxjs";
import { SuccessResponse } from "src/success-response";
import { catchError } from "rxjs/operators";
import { ErrorResponse } from "src/error-response";
import { LessonPlanSearchDto } from "src/lessonPlan/dto/lessonPlan.search.dto";
@Injectable()
export class LessonPlanService {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/Content`;

  public async getLessonPlan(lessonPlanId: string, request: any) {
    return this.httpService
      .get(`${this.url}/${lessonPlanId}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map(async (axiosResponse: AxiosResponse) => {
          let data = [axiosResponse.data];
          const lessonPlanDto = await this.mappedResponse(data);
          return new SuccessResponse({
            statusCode: 200,
            message: "ok.",
            data: lessonPlanDto[0],
          });
        }),
        catchError((e) => {
          var error = new ErrorResponse({
            errorCode: e.response?.status,
            errorMessage: e.response?.data?.params?.errmsg,
          });
          throw new HttpException(error, e.response.status);
        })
      );
  }
  public async createLessonPlan(request: any, lessonPlanDto: LessonPlanDto) {
    return this.httpService
      .post(`${this.url}`, lessonPlanDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          return new SuccessResponse({
            statusCode: 200,
            message: "Ok.",
            data: axiosResponse.data,
          });
        }),
        catchError((e) => {
          var error = new ErrorResponse({
            errorCode: e.response?.status,
            errorMessage: e.response?.data?.params?.errmsg,
          });
          throw new HttpException(error, e.response.status);
        })
      );
  }

  public async updateLessonPlan(
    lessonPlanId: string,
    request: any,
    lessonPlanDto: LessonPlanDto
  ) {
    var axios = require("axios");
    var data = lessonPlanDto;

    var config = {
      method: "put",
      url: `${this.url}/${lessonPlanId}`,
      headers: {
        Authorization: request.headers.authorization,
      },
      data: data,
    };
    const response = await axios(config);
    return new SuccessResponse({
      statusCode: 200,
      message: " Ok.",
      data: response.data,
    });
  }

  public async searchLessonPlan(
    request: any,
    lessonPlanSearchDto: LessonPlanSearchDto
  ) {
    return this.httpService
      .post(`${this.url}/search`, lessonPlanSearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map(async (response) => {
          const responsedata = await this.mappedResponse(response.data);
          return new SuccessResponse({
            statusCode: response.status,
            message: "Ok.",
            data: responsedata,
          });
        }),
        catchError((e) => {
          var error = new ErrorResponse({
            errorCode: e.response.status,
            errorMessage: e.response.data.params.errmsg,
          });
          throw new HttpException(error, e.response.status);
        })
      );
  }

  public async mappedResponse(result: any) {
    const lessonPlanResponse = result.map((obj: any) => {
      const lessonPlanMapping = {
        contentId: obj?.osid ? `${obj.osid}` : "",
        name: `${obj.name}`,
        code: obj?.code ? `${obj.code}` : "",
        status: obj?.status ? `${obj.status}` : "",
        channel: obj?.channel ? `${obj.channel}` : "",
        mediaType: obj?.mediaType ? `${obj.mediaType}` : "",
        compatibilityLevel: obj?.compatibilityLevel
          ? `${obj.compatibilityLevel}`
          : "",
        audience: obj?.audience ? obj.audience : [],
        posterImage: obj?.posterImage ? `${obj.posterImage}` : "",
        duration: obj?.duration ? `${obj.duration}` : "",
        downloadUrl: obj?.downloadUrl ? `${obj.downloadUrl}` : "",
        previewUrl: obj?.previewUrl ? `${obj.previewUrl}` : "",
        author: obj?.author ? `${obj.author}` : "",
        languageCode: obj?.languageCode ? obj.languageCode : [],
        language: obj?.language ? obj.language : [],
        ageGroup: obj?.ageGroup ? obj.ageGroup : [],
        contentType: obj?.contentType ? `${obj.contentType}` : "",
        category: obj?.category ? obj.category : [],
        teachingMode: obj?.teachingMode ? `${obj.teachingMode}` : "",
        skills: obj?.skills ? obj.skills : [],
        keywords: obj?.keywords ? obj.keywords : [],
        description: obj?.osid ? `${obj.osid}` : "",
        instructions: obj?.osid ? `${obj.osid}` : "",
        body: obj?.body ? obj.body : "",
        learningObjective: obj?.learningObjective ? obj.learningObjective : [],
        creator: obj?.creator ? `${obj.creator}` : "",
        reviewer: obj?.reviewer ? `${obj.reviewer}` : "",
        lastSubmittedBy: obj?.lastSubmittedBy ? `${obj.lastSubmittedBy}` : "",
        lastSubmittedOn: obj?.lastSubmittedOn ? `${obj.lastSubmittedOn}` : "",
        lastPublishedBy: obj?.lastPublishedBy ? `${obj.lastPublishedBy}` : "",
        lastPublishedOn: obj?.astPublishedOn ? `${obj.astPublishedOn}` : "",
        subject: obj?.subject ? obj.subject : [],
        questionCategories: obj?.questionCategories
          ? obj.questionCategories
          : [],
        medium: obj?.medium ? obj.medium : [],
        gradeLevel: obj?.gradeLevel ? obj.gradeLevel : [],
        topic: obj?.topic ? obj.topic : [],
        subjectCodes: obj?.subjectCodes ? obj.subjectCodes : [],
        difficultyLevel: obj?.difficultyLevel ? `${obj.difficultyLevel}` : "",
        board: obj?.board ? `${obj.board}` : "",
        primaryCategory: obj?.primaryCategory ? `${obj.primaryCategory}` : "",
        accessibility: obj?.accessibility ? obj.accessibility : [],
        createdAt: obj?.osCreatedAt ? `${obj.osCreatedAt}` : "",
        updatedAt: obj?.osUpdatedAt ? `${obj.osUpdatedAt}` : "",
        createdBy: obj?.osCreatedBy ? `${obj.osCreatedBy}` : "",
        updatedBy: obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "",
      };
      return new LessonPlanDto(lessonPlanMapping);
    });

    return lessonPlanResponse;
  }
}
