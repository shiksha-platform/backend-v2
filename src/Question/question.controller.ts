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
} from "@nestjs/common";

import { QuestionService } from "src/adapters/default/vidyadanQuestion.adapter";

@ApiTags("Question")
@Controller("question")
export class QuestionController {
  constructor(private service: QuestionService) {}

  @Get("vidyadan/getall")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Get all Questions detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "questionType", required: false })
  @ApiQuery({ name: "subject", required: false })
  @ApiQuery({ name: "language", required: false })
  @ApiQuery({ name: "medium", required: false })
  public async getAllQuestions(
    @Query("questionType") questionType: string,
    @Query("subject") subject: string,
    @Query("language") language: string,
    @Query("medium") medium: string
  ) {
    return this.service.getAllQuestions(
      questionType,
      subject,
      language,
      medium
    );
  }
}
