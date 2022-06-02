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
  @ApiQuery({ name: "language", required: false })
  @ApiQuery({ name: "medium", required: false })
  public async getAllQuestions(
    @Param("adapter") adapter: string,
    @Query("server") url: string,
    @Query("questionType") questionType: string,
    @Query("subject") subject: string,
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
}
