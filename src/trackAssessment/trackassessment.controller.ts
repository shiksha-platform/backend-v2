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
import { TrackAssessmentService } from "src/adapters/sunbirdrc/trackassessment.adapter";
import { TrackAssessmentDto } from "./dto/trackassessment.dto";
import { TrackAssessmentSearchDto } from "./dto/trackassessment-search-dto";

@ApiTags("Track Assessment")
@Controller("trackassessment")
export class AssessmentController {
  constructor(private service: TrackAssessmentService) {}

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Track Assessment has been created successfully.",
  })
  @ApiBody({ type: TrackAssessmentDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createAssessment(
    @Req() request: Request,
    @Body() assessmentDto: TrackAssessmentDto
  ) {
    return this.service.createAssessment(request, assessmentDto);
  }

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Track Assessment detail" })
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
  @ApiCreatedResponse({ description: "Track Assessment list." })
  @ApiBody({ type: TrackAssessmentSearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async searchAssessment(
    @Req() request: Request,
    @Body() assessmentSearchDto: TrackAssessmentSearchDto
  ) {
    return await this.service.searchAssessment(request, assessmentSearchDto);
  }
}
