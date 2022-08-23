import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { SuccessResponse } from "src/success-response";
import { QuestionDto } from "src/Question/dto/question.dto";
import { IServicelocator } from "../questionservicelocator";
export const HasuraQuestionToken = "HasuraQuestion";
@Injectable()
export class QuestionService implements IServicelocator {
  constructor(private httpService: HttpService) {}

  public async getQuestion(questionId: string, request: any) {
    var axios = require("axios");

    var data = {
      query: `query GetQuestion($examQuestionId:uuid) {
        question(where: {examQuestionId: {_eq: $examQuestionId}}) {
          answer
          avgRating
          avgTimeSpent
          bloomsLevel
          body
          class
          compatibilityLevel
          created_at
          examQuestionId
          expectedDuration
          feedback
          hints
          instructions
          interactions
          isTemplate
          language
          learningOutcome
          maxScore
          media
          numAttempts
          numCorrectAttempts
          numInCorrectAttempts
          numSkips
          options
          outcomeDeclaration
          purpose
          qlevel
          questionId
          qumlVersion
          responseDeclaration
          responseProcessing
          scoringMode
          solutionAvailable
          source
          subject
          templateDeclaration
          templateProcessing
          topic
          totalRatings
          totalTimeSpent
          type
          updated_at
          visibility
        }
      }
      `,
      variables: { examQuestionId: questionId },
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

    let result = response.data.data.question.map(
      (item: any) => new QuestionDto(item)
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }
  public async createQuestion(request: any, questionDto: QuestionDto) {
    var axios = require("axios");
    let newDataObject = "";
    const newData = Object.keys(questionDto).forEach((e) => {
      if (questionDto[e] && questionDto[e] != "") {
        if (Array.isArray(questionDto[e])) {
          newDataObject += `${e}: ${JSON.stringify(questionDto[e])}, `;
        } else {
          newDataObject += `${e}: ${questionDto[e]}, `;
        }
      }
    });

    var data = {
      query: `mutation CreateQuestion {
        insert_question_one(object: {${newDataObject}}) {
          examQuestionId
        }
      }
      `,
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

    const result = response.data.data.insert_question_one;

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async updateQuestion(
    questionId: string,
    request: any,
    questionDto: QuestionDto
  ) {
    var axios = require("axios");

    let newDataObject = "";
    const newData = Object.keys(questionDto).forEach((e) => {
      if (questionDto[e] && questionDto[e] != "") {
        if (Array.isArray(questionDto[e])) {
          newDataObject += `${e}: ${JSON.stringify(questionDto[e])}, `;
        } else {
          newDataObject += `${e}: ${questionDto[e]}, `;
        }
      }
    });

    var data = {
      query: `mutation UpdateQuestion($examQuestionId:uuid) {
          update_question(where: {examQuestionId: {_eq: $examQuestionId}}, _set: {${newDataObject}}) {
          affected_rows
        }
}`,
      variables: {
        examQuestionId: questionId,
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

  public async filterQuestion(
    limit: string,
    body: string,
    className: string,
    maxScore: string,
    questionId: string,
    subject: string,
    topic: string,
    type: string,
    page: number,
    request: any
  ) {
    var axios = require("axios");

    let offset = 0;

    if (page > 1) {
      offset = parseInt(limit) * (page - 1);
    }

    const searchData = {
      body: body,
      class: className,
      maxScore: maxScore,
      questionId: questionId,
      subject: subject,
      topic: topic,
      type: type,
    };

    let newDataObject = "";
    const newData = Object.keys(searchData).forEach((e) => {
      if (searchData[e] && searchData[e] != "") {
        newDataObject += `${e}:{_eq:"${searchData[e]}"}`;
      }
    });

    var data = {
      query: `query SearchQuestion($limit:Int, $offset:Int) {
            question(where:{ ${newDataObject}}, limit: $limit, offset: $offset,) {
              answer
              avgRating
              avgTimeSpent
              bloomsLevel
              body
              class
              compatibilityLevel
              created_at
              examQuestionId
              expectedDuration
              feedback
              hints
              instructions
              interactions
              isTemplate
              language
              learningOutcome
              maxScore
              media
              numAttempts
              numCorrectAttempts
              numInCorrectAttempts
              numSkips
              options
              outcomeDeclaration
              purpose
              qlevel
              questionId
              qumlVersion
              responseDeclaration
              responseProcessing
              scoringMode
              solutionAvailable
              source
              subject
              templateDeclaration
              templateProcessing
              topic
              totalRatings
              totalTimeSpent
              type
              updated_at
              visibility
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

    let result = response.data.data.question.map(
      (item: any) => new QuestionDto(item)
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async bulkImport(request: any, questionDto: [Object]) {
    let axios = require("axios");
    const result = Promise.all(
      questionDto.map(async (data: any) => {
        let newDataObject = "";
        const newData = Object.keys(data).forEach((e) => {
          if (data[e] && data[e] != "") {
            if (Array.isArray(data[e])) {
              newDataObject += `${e}: ${JSON.stringify(data[e])}, `;
            } else {
              newDataObject += `${e}: ${data[e]}, `;
            }
          }
        });

        var query = {
          query: `mutation CreateQuestion {
              insert_question_one(object: {${newDataObject}}) {
                examQuestionId
              }
            }
            `,
          variables: {},
        };
        var config = {
          method: "post",
          url: process.env.REGISTRYHASURA,
          headers: {
            "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
            "Content-Type": "application/json",
          },
          data: query,
        };

        const response = await axios(config);
        return await response.data;
      })
    );
    const responseArray = await result;
    return new SuccessResponse({
      statusCode: 200,
      message: " Ok.",
      data: responseArray,
    });
  }

  public async getAllQuestions(
    questionType: string,
    subject: [string],
    limit: string,
    language: string,
    medium: string,
    bloomsLevel: [string],
    topic: [string],
    className: [string],
    request: any
  ) {}

  public async getAllQuestionsByQuestionIds(
    questionIds: [string],
    request: any
  ) {}
  public async getSubjectList() {}

  public async getOneQuestion(questionId: string, request: any) {}

  public async getCompetenciesList(
    subject: string,
    limit: string,
    request: any
  ) {}
}
