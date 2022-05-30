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
} from "@nestjs/common";
import { QumlQuestionService } from "src/adapters/diksha/quml.adapter";

@ApiTags("Question")
@Controller("question")
export class QuestionController {
  constructor(
    private service: QumlQuestionService // private khanAcademyService: QumlQuestionService
  ) {}

  @Get(":adapter/search")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Get all Questions detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "questionType", required: false })
  @ApiQuery({ name: "subject", required: false })
  @ApiQuery({ name: "language", required: false })
  @ApiQuery({ name: "medium", required: false })
  public async getAllQuestions(
    @Param("adapter") adapter: string,
    @Query("questionType") questionType: string,
    @Query("subject") subject: string,
    @Query("language") language: string,
    @Query("medium") medium: string
  ) {
    if (adapter === "diksha") {
      return this.service.getAllQuestions(
        questionType,
        subject,
        language,
        medium
      );
    }
    // } else if (adapter === "khanAcadmey") {
    //   return this.khanAcademyService.getAllQuestions(
    //     questionType,
    //     subject,
    //     language,
    //     medium
    //   );
    // }
  }
}
