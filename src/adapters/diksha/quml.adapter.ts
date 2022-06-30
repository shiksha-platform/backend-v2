import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { QuestionDto } from "src/Question/dto/question.dto";

@Injectable()
export class QumlQuestionService {
  constructor(private httpService: HttpService) {}

  public async getAllQuestions(
    url: string,
    questionType: string,
    subject: string,
    limit: string,
    language: string,
    medium: string,
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
        },
        limit: limit,
      },
    };

    var config = {
      method: "post",
      url: `${url}/composite/v3/search`,
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
      let config = {
        method: "get",
        url: `${url}/question/v1/read/${value}?fields=body,qType,answer,responseDeclaration,name,solutions,editorState,media,name,board,medium,gradeLevel,subject,topic,learningOutcome,marks`,
      };
      const response = await axios(config);
      const data = response?.data;
      const final = data.result.question;

      const mappedResponse = {
        body: final.body,

        instructions: final.instructions,

        feedback: final.feedback,

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

        visibility: responseData.visibility,

        isTemplate: final.isTemplate,

        interactions: final.interactions,

        solutionAvailable: final.solutionAvailable,

        scoringMode: final.scoringMode,

        qumlVersion: responseData.qumlVersion,

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
}
