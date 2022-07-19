import {
  ApiBasicAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import {
  CacheInterceptor,
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
  Query,
  Param,
  Req,
  Request,
  Inject,
} from "@nestjs/common";
import {
  DikshaQuestionToken,
  QumlQuestionService,
} from "src/adapters/diksha/quml.adapter";
import { IServicelocator } from "src/adapters/questionservicelocator";
import { KhanAcademyQuestionToken } from "src/adapters/khanAcademy/khanAcademy.adapter";

@ApiTags("Question")
@Controller("question")
export class QuestionController {
  constructor(
    private service: QumlQuestionService, //private khanAcademyService: QumlQuestionService
    @Inject(DikshaQuestionToken) private dikshaProvider: IServicelocator,
    @Inject(KhanAcademyQuestionToken)
    private khanacademyProvider: IServicelocator
  ) {}

  @Get(":adapter/search")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Get all Questions detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "questionType", required: false })
  @ApiQuery({ name: "subject", required: false })
  @ApiQuery({ name: "limit", required: false })
  @ApiQuery({ name: "language", required: false })
  @ApiQuery({ name: "medium", required: false })
  @ApiQuery({ name: "bloomsLevel", required: false })
  public async getAllQuestions(
    @Param("adapter") adapter: string,
    @Query("questionType") questionType: string,
    @Query("subject") subject: string,
    @Query("limit") limit: string,
    @Query("language") language: string,
    @Query("medium") medium: string,
    @Query("bloomsLevel") bloomsLevel: string,
    @Req() request: Request
  ) {
    if (adapter === "diksha") {
      return this.dikshaProvider.getAllQuestions(
        questionType,
        subject,
        limit,
        language,
        medium,
        bloomsLevel,
        request
      );
    } else if (adapter === "khanacademy") {
      return this.khanacademyProvider.getAllQuestions(
        questionType,
        subject,
        limit,
        language,
        medium,
        bloomsLevel,
        request
      );
    }
  }

  @Get(":adapter/questionIds")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Get all Questions detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "questionIds", required: false })
  public async getAllQuestionsByQuestionIds(
    @Param("adapter") adapter: string,
    @Query("questionIds") questionIds: [string],
    @Req() request: Request
  ) {
    if (adapter === "diksha") {
      return this.dikshaProvider.getAllQuestionsByQuestionIds(
        questionIds,
        request
      );
    } else if (adapter === "khanacademy") {
      return this.khanacademyProvider.getAllQuestionsByQuestionIds(
        questionIds,
        request
      );
    }
  }

  @Get(":adapter/subjectlist")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Get all subject list" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  public async getSubjectList(
    @Param("adapter") adapter: string,
    @Req() request: Request
  ) {
    if (adapter === "diksha") {
      return this.dikshaProvider.getSubjectList();
    } else if (adapter === "khanacademy") {
      return this.khanacademyProvider.getSubjectList();
    }
  }

  @Get(":adapter/questionid")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Get Questions detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "questionId", required: false })
  public async getOneQuestion(
    @Param("adapter") adapter: string,
    @Query("questionId") questionId: string,
    @Req() request: Request
  ) {
    if (adapter === "diksha") {
      return this.dikshaProvider.getOneQuestion(questionId, request);
    } else if (adapter === "khanacademy") {
      return this.khanacademyProvider.getOneQuestion(questionId, request);
    }
  }

  @Get(":adapter/competencieslist")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Get all competencies list." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "subject", required: false })
  @ApiQuery({ name: "limit", required: false })
  public async getcompetenciesList(
    @Param("adapter") adapter: string,
    @Query("subject") subject: string,
    @Query("limit") limit: string,
    @Req() request: Request
  ) {
    if (adapter === "diksha") {
      return this.dikshaProvider.getCompetenciesList(subject, limit, request);
    } else if (adapter === "khanacademy") {
      return this.khanacademyProvider.getCompetenciesList(
        subject,
        limit,
        request
      );
    }
  }
}
