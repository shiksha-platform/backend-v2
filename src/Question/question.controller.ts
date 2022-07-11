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
} from "@nestjs/common";
import { QumlQuestionService } from "src/adapters/diksha/quml.adapter";

@ApiTags("Question")
@Controller("question")
export class QuestionController {
  constructor(
    private service: QumlQuestionService //private khanAcademyService: QumlQuestionService
  ) {}

  @Get(":adapter/search")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Get all Questions detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "questionType", required: false })
  @ApiQuery({ name: "server", required: false })
  @ApiQuery({ name: "subject", required: false })
  @ApiQuery({ name: "limit", required: false })
  @ApiQuery({ name: "language", required: false })
  @ApiQuery({ name: "medium", required: false })
  public async getAllQuestions(
    @Param("adapter") adapter: string,
    @Query("server") url: string,
    @Query("questionType") questionType: string,
    @Query("subject") subject: string,
    @Query("limit") limit: string,
    @Query("language") language: string,
    @Query("medium") medium: string,
    @Req() request: Request
  ) {
    if (adapter === "diksha") {
      if (url === "dev") {
        url = process.env.DIKSHADEVBASEAPIURL;
      } else if (url === "staging") {
        url = process.env.DIKSHASTAGINGAPIURL;
      }

      return this.service.getAllQuestions(
        url,
        questionType,
        subject,
        limit,
        language,
        medium,
        request
      );
    }
    // } else if (adapter === "khanAcademy") {
    // if (url === "dev") {
    //   url = process.env.khanAcademyBASEURL;
    // } else if (url === "staging") {
    //   url = process.env.khanAcademySTAGINGURL;
    // }
    //   return this.khanAcademyService.getAllQuestions(
    //     questionType,
    //     subject,
    //     language,
    //     medium
    //   );
    // }
  }

  @Get(":adapter/questionIds")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Get all Questions detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "server", required: false })
  @ApiQuery({ name: "questionIds", required: false })
  public async getAllQuestionsByQuestionIds(
    @Param("adapter") adapter: string,
    @Query("server") url: string,
    @Query("questionIds") questionIds: [string],
    @Req() request: Request
  ) {
    if (adapter === "diksha") {
      if (url === "dev") {
        url = process.env.DIKSHADEVBASEAPIURL;
      } else if (url === "staging") {
        url = process.env.DIKSHASTAGINGAPIURL;
      }

      return this.service.getAllQuestionsByQuestionIds(
        url,
        questionIds,
        request
      );
    }
    // } else if (adapter === "khanAcademy") {
    // if (url === "dev") {
    //   url = process.env.khanAcademyBASEURL;
    // } else if (url === "staging") {
    //   url = process.env.khanAcademySTAGINGURL;
    // }
    //   return this.khanAcademyService.getAllQuestionsByQuestionIds(
    //     questionType,
    //     subject,
    //     language,
    //     medium
    //   );
    // }
  }

  @Get(":adapter/subjectlist")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Get all Questions detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "server", required: false })
  public async getSubjectList(
    @Param("adapter") adapter: string,
    @Query("server") url: string,
    @Req() request: Request
  ) {
    if (adapter === "diksha") {
      if (url === "dev") {
        url = process.env.DIKSHADEVBASEAPIURL;
      } else if (url === "staging") {
        url = process.env.DIKSHASTAGINGAPIURL;
      }

      return this.service.getSubjectList();
    }
    // } else if (adapter === "khanAcademy") {
    // if (url === "dev") {
    //   url = process.env.khanAcademyBASEURL;
    // } else if (url === "staging") {
    //   url = process.env.khanAcademySTAGINGURL;
    // }
    //   return this.khanAcademyService.getSubjectList(
    //     questionType,
    //     subject,
    //     language,
    //     medium
    //   );
    // }
  }

  @Get(":adapter/competencieslist")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Get all competencies list." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "server", required: false })
  public async getcompetenciesList(
    @Param("adapter") adapter: string,
    @Query("server") url: string,
    @Req() request: Request
  ) {
    if (adapter === "diksha") {
      if (url === "dev") {
        url = process.env.DIKSHADEVBASEAPIURL;
      } else if (url === "staging") {
        url = process.env.DIKSHASTAGINGAPIURL;
      }

      return this.service.getcompetenciesList();
    }
    // } else if (adapter === "khanAcademy") {
    // if (url === "dev") {
    //   url = process.env.khanAcademyBASEURL;
    // } else if (url === "staging") {
    //   url = process.env.khanAcademySTAGINGURL;
    // }
    //   return this.khanAcademyService.getcompetenciesList(
    //     questionType,
    //     subject,
    //     language,
    //     medium
    //   );
    // }
  }
}
