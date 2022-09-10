import { HttpException, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { catchError, map } from "rxjs";
import { SuccessResponse } from "src/success-response";
import { TrackAssessmentDto } from "src/trackAssessment/dto/trackassessment.dto";
import { ErrorResponse } from "src/error-response";
import { Status } from "../../trackAssessment/enums/statuses.enum";

@Injectable()
export class TrackAssessmentService {
  constructor(private httpService: HttpService) {}
  assessmentURL = `${process.env.BASEAPIURL}/Trackassessment`;
  assessmentsetURL = `${process.env.BASEAPIURL}/Assessmentset`;
  url = process.env.DIKSHADEVBASEAPIURL;
  public async getAssessment(assessmentId: any, request: any) {
    var axios = require("axios");
    try {
      var data = {
        query: `query GetTrackAssessment($trackAssessmentId:uuid) {
      trackassessment(where: {trackAssessmentId: {_eq: $trackAssessmentId}}) {
        answersheet
        filter
        created_at
        updated_at
      trackAssessmentId
        questions
        score
        totalScore
        source
        studentId
        teacherId
        groupId
        subject
        date
        type
        status
      }
    }`,
        variables: {
          trackAssessmentId: assessmentId,
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

      const result = await this.mappedResponse(
        response.data.data.trackassessment
      );
      return new SuccessResponse({
        statusCode: 200,
        message: "Ok.",
        data: result,
      });
    } catch (e) {
      return `${e}`;
    }
  }

  public async createAssessment(
    request: any,
    assessmentDto: TrackAssessmentDto
  ) {
    let variables: object;
    try {
      const axios = require("axios");
      if (!assessmentDto.status) {
        // let's set it as "COMPLETED" by default
        assessmentDto.status = Status.COMPLETED;
      }
      if (assessmentDto.status == Status.COMPLETED) {
        const answer = JSON.stringify(assessmentDto.answersheet);
        const jsonObj = JSON.parse(answer);
        const params = JSON.parse(jsonObj);

        let sum = 0;
        params.children.map((e: any) => {
          sum += e.score;
          return sum;
        });
        assessmentDto.score = sum.toString();

        const questionIds = assessmentDto.questions;
        const totalScoreArray = [];
        for (const value of questionIds) {
          const config = {
            method: "get",
            url: `${this.url}/question/v1/read/${value}?fields=maxScore`,
          };
          const response = await axios(config);
          const data = response?.data;
          const final = data.result.question;

          const scoreResponse = {
            maxScore: final.maxScore,
          };
          totalScoreArray.push(scoreResponse);
        }
        let totalScore = 0;
        totalScoreArray.map((e: any) => {
          totalScore += e.maxScore;
          return totalScore;
        });
        assessmentDto.totalScore = totalScore.toString();

        variables = {
          filter: assessmentDto.filter,
          source: assessmentDto.source,
          questions: assessmentDto.questions.toString(),
          studentId: assessmentDto.studentId,
          teacherId: assessmentDto.teacherId,
          type: assessmentDto.type,
          answersheet: assessmentDto.answersheet,
          score: assessmentDto.score,
          totalScore: assessmentDto.totalScore,
          groupId: assessmentDto.groupId,
          subject: assessmentDto.subject,
          status: assessmentDto.status,
        };
      } else {
        variables = {
          filter: null,
          source: null,
          questions: null,
          studentId: assessmentDto.studentId,
          teacherId: assessmentDto.teacherId,
          type: assessmentDto.type,
          answersheet: null,
          score: null,
          totalScore: null,
          groupId: assessmentDto.groupId,
          subject: null,
          status: assessmentDto.status,
        };
      }

      const data = {
        query: `mutation CreateTrackAssessment($filter: String, $score: String, $totalScore:String, $source: String, $questions: String, $studentId: String, $teacherId: String, $type: String, $answersheet: String,$groupId:String, $subject:String, $status: String) {
          insert_trackassessment_one(object:{filter: $filter, score: $score, totalScore:$totalScore, source: $source, questions: $questions, studentId: $studentId, teacherId: $teacherId, type: $type, answersheet: $answersheet,groupId:$groupId,subject:$subject, status: $status}) {
            trackAssessmentId
          }
        }`,
        variables: variables,
      };

      const config = {
        method: "post",
        url: process.env.REGISTRYHASURA,
        headers: {
          "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios(config);

      return new SuccessResponse({
        statusCode: 200,
        message: "Ok.",
        data: response.data,
      });
    } catch (e) {
      return `${e}`;
    }
  }

  public async searchAssessment(
    fromDate: string,
    toDate: string,
    limit: string,
    source: string,
    studentId: string,
    teacherId: string,
    groupId: string,
    subject: string,
    page: number,
    request: any
  ) {
    var axios = require("axios");

    let offset = 0;

    if (page > 1) {
      offset = parseInt(limit) * (page - 1);
    }
    let searchData = {
      fromDate,
      toDate,
      source,
      studentId,
      teacherId,
      groupId,
      subject,
    };

    let query = "";
    if (searchData.fromDate && searchData.toDate) {
      query += `date:{_gte: "${searchData.fromDate}"}, _and: {date: {_lte: "${searchData.toDate}"}} `;
    }
    const objectKeys = Object.keys(searchData);
    objectKeys.forEach((e, index) => {
      if (
        searchData[e] &&
        searchData[e] != "" &&
        !["fromDate", "toDate"].includes(e)
      ) {
        query += `${e}:{_eq:"${searchData[e]}"}`;
        if (index !== objectKeys.length - 1) {
          query += " ";
        }
      }
    });

    var data = {
      query: `query searchTrackAssessment($offset:Int,$limit:Int) {
  trackassessment(limit: $limit, offset: $offset, where: {${query}}) {
        answersheet
        filter
        created_at
        updated_at
      trackAssessmentId
        questions
        score
        totalScore
        source
        studentId
        teacherId
        groupId
        subject
        date
        type
        status
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

    const result = await this.mappedResponse(
      response.data.data.trackassessment
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async mappedResponse(result: any) {
    const trackAssessmentResponse = result.map((obj: any) => {
      const trackAssessmentMapping = {
        trackAssessmentId: obj?.trackAssessmentId
          ? `${obj.trackAssessmentId}`
          : "",
        filter: obj?.filter ? `${obj.filter}` : "",
        type: obj?.type ? `${obj.type}` : "",
        questions: obj?.questions ? obj.questions : "",
        source: obj?.source ? `${obj.source}` : "",
        answersheet: obj?.answersheet ? `${obj.answersheet}` : "",
        score: obj?.score ? `${obj.score}` : "",
        totalScore: obj?.totalScore ? `${obj.totalScore}` : "",
        studentId: obj?.studentId ? `${obj.studentId}` : "",
        teacherId: obj?.teacherId ? `${obj.teacherId}` : "",
        groupId: obj?.groupId ? `${obj.groupId}` : "",
        subject: obj?.subject ? `${obj.subject}` : "",
        date: obj?.date ? `${obj.date}` : "",
        status: obj?.status ? `${obj.status}` : "",
        createdAt: obj?.created_at ? `${obj.created_at}` : "",
        updatedAt: obj?.updated_at ? `${obj.updated_at}` : "",
      };
      return new TrackAssessmentDto(trackAssessmentMapping);
    });

    return trackAssessmentResponse;
  }
}
