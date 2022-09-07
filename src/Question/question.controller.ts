import {
  ApiBasicAuth,
  ApiBody,
  ApiCreatedResponse,
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
  Post,
  SerializeOptions,
  Body,
  Put,
} from "@nestjs/common";
import {
  DikshaQuestionToken,
  QumlQuestionService,
} from "src/adapters/diksha/quml.adapter";
import { IServicelocator } from "src/adapters/questionservicelocator";
import { KhanAcademyQuestionToken } from "src/adapters/khanAcademy/khanAcademy.adapter";
import { QuestionDto } from "./dto/question.dto";
import { HasuraQuestionToken } from "src/adapters/hasura/question.adapter";

@ApiTags("Question")
@Controller("question")
export class QuestionController {
  constructor(
    @Inject(DikshaQuestionToken) private dikshaProvider: IServicelocator,
    @Inject(KhanAcademyQuestionToken)
    private khanacademyProvider: IServicelocator,

    @Inject(HasuraQuestionToken)
    private hasuraProvider: IServicelocator
  ) {}

  @Get(":adapter/search")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  //@ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Get all Questions detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "questionType", required: false })
  @ApiQuery({ name: "subject", required: false })
  @ApiQuery({ name: "limit", required: false })
  @ApiQuery({ name: "language", required: false })
  @ApiQuery({ name: "medium", required: false })
  @ApiQuery({ name: "bloomsLevel", required: false })
  @ApiQuery({ name: "topic", required: false })
  @ApiQuery({ name: "className", required: false })
  public async getAllQuestions(
    @Param("adapter") adapter: string,
    @Query("questionType") questionType: string,
    @Query("subject") subject: [string],
    @Query("limit") limit: string,
    @Query("language") language: string,
    @Query("medium") medium: string,
    @Query("bloomsLevel") bloomsLevel: [string],
    @Query("topic") topic: [string],
    @Query("className") className: [string],
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
        topic,
        className,
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
        topic,
        className,
        request
      );
    }
  }

  @Get(":adapter/questionIds")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  //@ApiBasicAuth("access-token")
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
  @ApiOkResponse({ description: "Get all subject list" })
  @ApiQuery({ name: "gradeLevel", required: true })
  @ApiForbiddenResponse({ description: "Forbidden" })
  public async getSubjectList(
    @Param("adapter") adapter: string,
    @Query("gradeLevel") gradeLevel: string
  ) {
    if (adapter === "diksha") {
      return this.dikshaProvider.getSubjectList(gradeLevel);
    } else if (adapter === "khanacademy") {
      return this.khanacademyProvider.getSubjectList(gradeLevel);
    }
  }

  @Get(":adapter/topicslist")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiOkResponse({ description: "Get all subject list" })
  @ApiQuery({ name: "subject", required: true })
  @ApiForbiddenResponse({ description: "Forbidden" })
  public async getTopicsList(
    @Param("adapter") adapter: string,
    @Query("subject") subject: string
  ) {
    if (adapter === "diksha") {
      return this.dikshaProvider.getTopicsList(subject);
    } else if (adapter === "khanacademy") {
      return this.khanacademyProvider.getTopicsList(subject);
    }
  }

  @Get(":adapter/questionid")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  // @ApiBasicAuth("access-token")
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
  //@ApiBasicAuth("access-token")
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

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Question detail." })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  @ApiQuery({ name: "adapter" })
  getQuestion(
    @Param("id") questionId: string,
    @Query("adapter") adapter: string,
    @Req() request: Request
  ) {
    if (adapter === "diksha") {
      return this.dikshaProvider.getQuestion(questionId, request);
    } else if (adapter === "khanacademy") {
      return this.khanacademyProvider.getQuestion(questionId, request);
    } else if (adapter === "shiksha") {
      return this.hasuraProvider.getQuestion(questionId, request);
    }
  }

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Question has been created successfully.",
  })
  @ApiBody({ type: QuestionDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiQuery({ name: "adapter" })
  public async createQuestion(
    @Req() request: Request,
    @Query("adapter") adapter: string,
    @Body() questionDto: QuestionDto
  ) {
    if (adapter === "diksha") {
      return this.dikshaProvider.createQuestion(request, questionDto);
    } else if (adapter === "khanacademy") {
      return this.khanacademyProvider.createQuestion(request, questionDto);
    } else if (adapter === "shiksha") {
      return this.hasuraProvider.createQuestion(request, questionDto);
    }
  }

  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Question has been updated successfully.",
  })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiQuery({ name: "adapter" })
  public async updateQuestion(
    @Param("id") questionId: string,
    @Req() request: Request,
    @Body() questionDto: QuestionDto,
    @Query("adapter") adapter: string
  ) {
    if (adapter === "diksha") {
      return this.dikshaProvider.updateQuestion(
        questionId,
        request,
        questionDto
      );
    } else if (adapter === "khanacademy") {
      return this.khanacademyProvider.updateQuestion(
        questionId,
        request,
        questionDto
      );
    } else if (adapter === "shiksha") {
      return this.hasuraProvider.updateQuestion(
        questionId,
        request,
        questionDto
      );
    }
  }

  @Post("filter/:adapter")
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: " Ok." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "limit", required: false })
  @ApiQuery({ name: "body", required: false })
  @ApiQuery({ name: "className", required: false })
  @ApiQuery({ name: "maxScore", required: false })
  @ApiQuery({ name: "questionId", required: false })
  @ApiQuery({ name: "subject", required: false })
  @ApiQuery({ name: "topic", required: false })
  @ApiQuery({ name: "type", required: false })
  @ApiQuery({ name: "page", required: false })
  public async filterQuestion(
    @Param("adapter") adapter: string,
    @Query("limit") limit: string,
    @Query("body") body: string,
    @Query("className") className: string,
    @Query("maxScore") maxScore: string,
    @Query("questionId") questionId: string,
    @Query("subject") subject: string,
    @Query("topic") topic: string,
    @Query("type") type: string,
    @Query("page") page: number,
    @Req() request: Request
  ) {
    if (adapter === "diksha") {
      return this.dikshaProvider.filterQuestion(
        limit,
        body,
        className,
        maxScore,
        questionId,
        subject,
        topic,
        type,
        page,
        request
      );
    } else if (adapter === "khanacademy") {
      return this.khanacademyProvider.filterQuestion(
        limit,
        body,
        className,
        maxScore,
        questionId,
        subject,
        topic,
        type,
        page,
        request
      );
    } else if (adapter === "shiksha") {
      return this.hasuraProvider.filterQuestion(
        limit,
        body,
        className,
        maxScore,
        questionId,
        subject,
        topic,
        type,
        page,
        request
      );
    }
  }

  @Post(":adapter/bulkImport")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Bulk Question has been created successfully.",
  })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async bulkImport(
    @Param("adapter") adapter: string,
    @Req() request: Request,
    @Body() questionDto: [Object]
  ) {
    if (adapter === "diksha") {
      return this.dikshaProvider.bulkImport(request, questionDto);
    } else if (adapter === "khanacademy") {
      return this.khanacademyProvider.bulkImport(request, questionDto);
    } else if (adapter === "shiksha") {
      return this.hasuraProvider.bulkImport(request, questionDto);
    }
  }
}
