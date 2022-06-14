import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  Req,
  CacheInterceptor,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBasicAuth,
} from "@nestjs/swagger";
import { Request } from "@nestjs/common";
import { LessonPlanDto } from "./dto/lessonPlan.dto";
import { LessonPlanSearchDto } from "./dto/lessonPlan.search.dto";
import { LessonPlanService } from "src/adapters/sunbirdrc/lessonPlan.adapter";
@ApiTags("Lesson Plan")
@Controller("lessonPlan")
export class LessonPlanController {
  constructor(private readonly service: LessonPlanService) {}

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "LessonPlan detail." })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  getLessonPlans(@Param("id") lessonPlanId: string, @Req() request: Request) {
    return this.service.getLessonPlan(lessonPlanId, request);
  }

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "LessonPlan has been created successfully.",
  })
  @ApiBody({ type: LessonPlanDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createLessonPlan(
    @Req() request: Request,
    @Body() lessonPlanDto: LessonPlanDto
  ) {
    return this.service.createLessonPlan(request, lessonPlanDto);
  }

  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "LessonPlan has been updated successfully.",
  })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateLessonPlan(
    @Param("id") lessonPlanId: string,
    @Req() request: Request,
    @Body() lessonPlanDto: LessonPlanDto
  ) {
    return await this.service.updateLessonPlan(
      lessonPlanId,
      request,
      lessonPlanDto
    );
  }

  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "LessonPlan list." })
  @ApiBody({ type: LessonPlanSearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async searchLessonPlan(
    @Req() request: Request,
    @Body() lessonPlanSearchDto: LessonPlanSearchDto
  ) {
    return await this.service.searchLessonPlan(request, lessonPlanSearchDto);
  }
}
