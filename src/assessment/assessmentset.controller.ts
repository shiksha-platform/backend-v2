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
import { AssessmentSearchDto } from "./dto/assessment-search-dto";
import { AssessmentsetDto } from "./dto/assessmentset.dto";
import { AssessmentsetService } from "src/adapters/sunbirdrc/assessmentset.adapter";

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
  @ApiBody({ type: AssessmentSearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async searchAssessmentset(
    @Req() request: Request,
    @Body() assessmentSearchDto: AssessmentSearchDto
  ) {
    return await this.service.searchAssessmentset(request, assessmentSearchDto);
  }
}
