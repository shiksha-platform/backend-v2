import {
  ApiTags,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBasicAuth,
  ApiBody,
  ApiQuery,
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
  Query,
} from "@nestjs/common";
import { AssessmentSetSearchDto } from "./dto/assessmentset-search-dto";
import { AssessmentsetDto } from "./dto/assessmentset.dto";
import { AssessmentsetService } from "src/adapters/hasura/assessmentset.adapter";

@ApiTags("Assessmentset")
@Controller("assessmentset")
export class AssessmentsetController {
  constructor(private service: AssessmentsetService) {}

  @Post("/assessmentset")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Assessment set has been created successfully.",
  })
  @ApiBody({ type: AssessmentsetDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createAssessmentSet(
    @Req() request: Request,
    @Body() assessmentsetDto: AssessmentsetDto
  ) {
    return this.service.createAssessmentSet(request, assessmentsetDto);
  }
  @Get("assessmentset/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Assessment set detail" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getAssessmentset(
    @Param("id") assessmentsetId: string,
    @Req() request: Request
  ) {
    return this.service.getAssessmentset(assessmentsetId, request);
  }

  @Post("assessmentset/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Assessment set list." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  @ApiQuery({ name: "limit", required: false })
  @ApiQuery({ name: "assessmentsetId", required: false })
  @ApiQuery({ name: "type", required: false })
  @ApiQuery({ name: "title", required: false })
  @ApiQuery({ name: "gradeType", required: false })
  public async searchAssessmentset(
    @Req() request: Request,
    @Query("limit") limit: string,
    @Query("assessmentsetId") assessmentsetId: string,
    @Query("type") type: string,
    @Query("title") title: string,
    @Query("gradeType") gradeType: string
  ) {
    return await this.service.searchAssessmentset(
      limit,
      assessmentsetId,
      type,
      title,
      gradeType,
      request
    );
  }
}
