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
  Body,
  CacheInterceptor,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  Post,
  Put,
  Req,
  SerializeOptions,
  UseInterceptors,
  Request,
} from "@nestjs/common";

import { WorkHistoryService } from "../adapters/hasura/workhistory.adapter";
import { WorkHistoryDto } from "./dto/work-history.dto";

@ApiTags("Work History")
@Controller("workhistory")
export class WorkHistoryController {
  constructor(private service: WorkHistoryService) {}

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Work History has been created successfully.",
  })
  @ApiBody({ type: WorkHistoryDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createWorkHistory(
    @Req() request: Request,
    @Body() workHistoryDto: WorkHistoryDto
  ) {
    return this.service.createWorkHistory(request, workHistoryDto);
  }

  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Work History has been updated successfully.",
  })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateWorkHistory(
    @Param("id") id: string,
    @Req() request: Request,
    @Body() workHistoryDto: WorkHistoryDto
  ) {
    return await this.service.updateWorkHistory(id, request, workHistoryDto);
  }

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Work History detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getWorkHistory(
    @Param("id") workHistoryId: string,
    @Req() request: Request
  ) {
    return await this.service.getWorkHistory(workHistoryId, request);
  }

  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Work History list." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiQuery({ name: "limit", required: false })
  @ApiQuery({ name: "workHistoryId", required: false })
  @ApiQuery({ name: "userId", required: false })
  @ApiQuery({ name: "dateOfJoining", required: false })
  @ApiQuery({ name: "dateOfRelieving", required: false })
  @ApiQuery({ name: "page", required: false })
  public async searchWorkHistory(
    @Query("limit") limit: string,
    @Query("workHistoryId") workHistoryId: string,
    @Query("userId") userId: string,
    @Query("dateOfJoining") dateOfJoining: string,
    @Query("dateOfRelieving") dateOfRelieving: string,
    @Query("page") page: number,
    @Req() request: Request
  ) {
    return await this.service.searchWorkHistory(
      limit,
      workHistoryId,
      userId,
      dateOfJoining,
      dateOfRelieving,
      page,
      request
    );
  }
}
