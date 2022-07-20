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
    subject: string,
    limit: string,
    language: string,
    medium: string,
    bloomsLevel: [string],
    request: any
  ) {}

  public async getQuestion(url: any, value: any) {}

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
