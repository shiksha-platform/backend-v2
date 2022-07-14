import {
  ApiTags,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBasicAuth,
  ApiBody,
} from "@nestjs/swagger";
import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  Req,
  Request,
  CacheInterceptor,
  Post,
  Body,
} from "@nestjs/common";
import { AssessmentService } from "src/adapters/sunbirdrc/assessment.adapter";
import { AssessmentDto } from "./dto/assessment.dto";
import { AssessmentSearchDto } from "./dto/assessment-search-dto";

@ApiTags("Assessment")
@Controller("assessment")
export class AssessmentController {
  constructor(private service: AssessmentService) {}

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Assessment has been created successfully.",
  })
  @ApiBody({ type: AssessmentDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createAssessment(
    @Req() request: Request,
    @Body() assessmentDto: AssessmentDto
  ) {
    return this.service.createAssessment(request, assessmentDto);
  }

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Assessment detail" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getAssessment(
    @Param("id") assessmentId: string,
    @Req() request: Request
  ) {
    return this.service.getAssessment(assessmentId, request);
  }

  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Assessment list." })
  @ApiBody({ type: AssessmentSearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async searchAssessment(
    @Req() request: Request,
    @Body() assessmentSearchDto: AssessmentSearchDto
  ) {
    return await this.service.searchAssessment(request, assessmentSearchDto);
  }
}
