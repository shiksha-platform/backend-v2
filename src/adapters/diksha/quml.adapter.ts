import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { QuestionDto } from "src/Question/dto/question.dto";
import { IServicelocator } from "../questionservicelocator";
export const DikshaQuestionToken = "EsamwadQuestion";
@Injectable()
export class QumlQuestionService implements IServicelocator {
  constructor(private httpService: HttpService) {}
  url = process.env.DIKSHADEVBASEAPIURL;
  public async getAllQuestions(
    questionType: string,
    subject: string,
    limit: string,
    language: string,
    medium: string,
    bloomsLevel: string,
    request: any
  ) {
    var axios = require("axios");
    var data = {
      request: {
        filters: {
          objectType: "Question",
          status: ["Live"],
          qType: questionType,
          subject: subject,
          language: language,
          medium: medium,
          bloomsLevel: bloomsLevel,
        },
        limit: limit,
      },
    };

    var config = {
      method: "post",
      url: `${this.url}/composite/v3/search`,
      headers: {
        Authorization: request.headers.authorization,
      },
      data: data,
    };

    const response = await axios(config);
    const responseData = response.data.result.Question;
    let arrayIds = responseData.map((e: any) => {
      return e.identifier;
    });

    let questionArray = [];
    for (let value of arrayIds) {
      let questionData = this.getQuestion(value);
      questionArray.push(await questionData);
    }

    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: questionArray,
    });
  }

  public async getQuestion(value: any) {
    var axios = require("axios");

    let config = {
      method: "get",
      url: `${this.url}/question/v1/read/${value}?fields=body,qType,answer,responseDeclaration,name,solutions,editorState,media,name,board,medium,gradeLevel,subject,topic,learningOutcome,marks`,
    };

    const response = await axios(config);

    const data = response?.data;
    const final = data.result.question;

    const mappedResponse = {
      body: final.body,

      instructions: final.instructions,

      feedback: final.feedback,

      topic: final.topic,

      subject: final.subject,

      class: final.gradeLevel,

      questionId: final.identifier,

      hints: final.hints,

      options: final.editorState.options,

      media: final.media,

      responseDeclaration: final.responseDeclaration,

      outcomeDeclaration: final.outcomeDeclaration,

      templateDeclaration: final.templateDeclaration,

      templateProcessing: final.templateProcessing,

      responseProcessing: final.responseProcessing,

      bloomsLevel: final.bloomsLevel,

      qlevel: final.qlevel,

      purpose: final.purpose,

      expectedDuration: final.expectedDuration,

      maxScore: final.maxScore,

      type: final.qType,

      visibility: final.visibility,

      isTemplate: final.isTemplate,

      interactions: final.interactions,

      solutionAvailable: final.solutionAvailable,

      scoringMode: final.scoringMode,

      qumlVersion: final.qumlVersion,

      totalTimeSpent: final.totalTimeSpent,

      avgTimeSpent: final.avgTimeSpent,

      numAttempts: final.numAttempts,

      numCorrectAttempts: final.numCorrectAttempts,

      numInCorrectAttempts: final.numInCorrectAttempts,

      numSkips: final.numSkips,

      avgRating: final.avgRating,

      totalRatings: final.totalRatings,
    };

    let res = new QuestionDto(mappedResponse);
    return res;
  }

  public async getAllQuestionsByQuestionIds(
    questionIds: [string],
    request: any
  ) {
    var axios = require("axios");
    let questionArray = [];
    for (let value of questionIds) {
      let config = {
        method: "get",
        url: `${this.url}/question/v1/read/${value}?fields=body,qType,answer,responseDeclaration,name,solutions,editorState,media,name,board,medium,gradeLevel,subject,topic,learningOutcome,marks`,
      };
      const response = await axios(config);
      const data = response?.data;
      const final = data.result.question;

      const mappedResponse = {
        body: final.body,

        instructions: final.instructions,

        feedback: final.feedback,

        topic: final.topic,

        subject: final.subject,

        class: final.gradeLevel,

        questionId: final.identifier,

        hints: final.hints,

        options: final.editorState.options,

        media: final.media,

        responseDeclaration: final.responseDeclaration,

        outcomeDeclaration: final.outcomeDeclaration,

        templateDeclaration: final.templateDeclaration,

        templateProcessing: final.templateProcessing,

        responseProcessing: final.responseProcessing,

        bloomsLevel: final.bloomsLevel,

        qlevel: final.qlevel,

        purpose: final.purpose,

        expectedDuration: final.expectedDuration,

        maxScore: final.maxScore,

        type: final.qType,

        visibility: final.visibility,

        isTemplate: final.isTemplate,

        interactions: final.interactions,

        solutionAvailable: final.solutionAvailable,

        scoringMode: final.scoringMode,

        qumlVersion: final.qumlVersion,

        totalTimeSpent: final.totalTimeSpent,

        avgTimeSpent: final.avgTimeSpent,

        numAttempts: final.numAttempts,

        numCorrectAttempts: final.numCorrectAttempts,

        numInCorrectAttempts: final.numInCorrectAttempts,

        numSkips: final.numSkips,

        avgRating: final.avgRating,

        totalRatings: final.totalRatings,
      };

      let res = new QuestionDto(mappedResponse);
      questionArray.push(res);
    }

    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: questionArray,
    });
  }
  public async getSubjectList() {
    const response = {
      subjects: [
        "Social Science",
        "Science",
        "Mathematics",
        "Hindi",
        "English",
        "History",
        "Geography",
      ],
    };

    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: response,
    });
  }

  public async getOneQuestion(questionId: string, request: any) {
    var axios = require("axios");

    let config = {
      method: "get",
      url: `${this.url}/question/v1/read/${questionId}?fields=body,qType,answer,responseDeclaration,name,solutions,editorState,media,name,board,medium,gradeLevel,subject,topic,learningOutcome,marks`,
    };

    const response = await axios(config);

    const data = response?.data;
    const final = data.result.question;

    const mappedResponse = {
      body: final.body,

      instructions: final.instructions,

      feedback: final.feedback,

      topic: final.topic,

      subject: final.subject,

      class: final.gradeLevel,

      questionId: final.identifier,

      hints: final.hints,

      options: final.editorState.options,

      media: final.media,

      responseDeclaration: final.responseDeclaration,

      outcomeDeclaration: final.outcomeDeclaration,

      templateDeclaration: final.templateDeclaration,

      templateProcessing: final.templateProcessing,

      responseProcessing: final.responseProcessing,

      bloomsLevel: final.bloomsLevel,

      qlevel: final.qlevel,

      purpose: final.purpose,

      expectedDuration: final.expectedDuration,

      maxScore: final.maxScore,

      type: final.qType,

      visibility: final.visibility,

      isTemplate: final.isTemplate,

      interactions: final.interactions,

      solutionAvailable: final.solutionAvailable,

      scoringMode: final.scoringMode,

      qumlVersion: final.qumlVersion,

      totalTimeSpent: final.totalTimeSpent,

      avgTimeSpent: final.avgTimeSpent,

      numAttempts: final.numAttempts,

      numCorrectAttempts: final.numCorrectAttempts,

      numInCorrectAttempts: final.numInCorrectAttempts,

      numSkips: final.numSkips,

      avgRating: final.avgRating,

      totalRatings: final.totalRatings,
    };
    let res = new QuestionDto(mappedResponse);
    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: res,
    });
  }
  public async getcompetenciesList() {
    const response = {
      competencies: [
        "Cognitive",
        "Critical Thinking",
        "Enterprenurial",
        "Reasoning",
      ],
    };

    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: response,
    });
  }
}
