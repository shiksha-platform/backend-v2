import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { QuestionDto } from "src/Question/dto/question.dto";
import { IServicelocator } from "../questionservicelocator";
export const KhanAcademyQuestionToken = "KhanAcademyQuestion";
@Injectable()
export class KhanAcademyQuestionService implements IServicelocator {
  constructor(private httpService: HttpService) {}

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
  public async getSubjectList(gradeLevel: string) {}

  public async getTopicsList(subject: string) {}
  public async getOneQuestion(questionId: string, request: any) {}

  public async getCompetenciesList(
    subject: string,
    limit: string,
    request: any
  ) {}

  getQuestion(questionId: string, request: any) {}
  createQuestion(request, questionDto) {}
  updateQuestion(questionId, request, questionDto) {}
  filterQuestion(
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
  ) {}
  bulkImport(request: any, questionDto: [Object]) {}
}
