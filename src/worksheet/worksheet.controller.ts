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
  ConsoleLogger,
} from "@nestjs/common";
import { WorksheetService } from "src/adapters/sunbirdrc/worksheet.adapter";
import { WorksheetDto } from "./dto/worksheet.dto";
import { WorksheetSearchDto } from "./dto/worksheet-search.dto";

@ApiTags("Worksheet")
@Controller("worksheet")
export class WorksheetController {
  constructor(private service: WorksheetService) {}

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Worksheet has been created successfully.",
  })
  @ApiBody({ type: WorksheetDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createWorksheet(
    @Req() request: Request,
    @Body() worksheetDto: WorksheetDto
  ) {
    return this.service.createWorksheet(request, worksheetDto);
  }

  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Worksheet has been updated successfully.",
  })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateWorksheet(
    @Param("id") id: string,
    @Req() request: Request,
    @Body() worksheetDto: WorksheetDto
  ) {
    return await this.service.updateWorksheet(id, request, worksheetDto);
  }

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Worksheet detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getWorksheet(
    @Param("id") worksheetId: string,
    @Req() request: Request
  ) {
    return this.service.getWorksheet(worksheetId, request);
  }

  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Worksheet list." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiQuery({ name: "limit", required: false })
  @ApiQuery({ name: "source", required: false })
  @ApiQuery({ name: "grade", required: false })
  @ApiQuery({ name: "name", required: false })
  @ApiQuery({ name: "level", required: false })
  @ApiQuery({ name: "subject", required: false })
  @ApiQuery({ name: "topic", required: false })
  @ApiQuery({ name: "worksheetId", required: false })
  @ApiQuery({ name: "page", required: false })
  public async searchWorksheet(
    @Query("limit") limit: string,
    @Query("source") source: string,
    @Query("grade") grade: string,
    @Query("name") name: string,
    @Query("level") level: string,
    @Query("subject") subject: string,
    @Query("topic") topic: string,
    @Query("worksheetId") worksheetId: string,
    @Query("page") page: number,
    @Req() request: Request
  ) {
    return await this.service.searchWorksheet(
      limit,
      source,
      grade,
      name,
      level,
      subject,
      topic,
      worksheetId,
      page,
      request
    );
  }

  @Post(":worksheet/pdf")
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: " Ok." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "worksheetId", required: true })
  @ApiQuery({ name: "templateId", required: true })
  public async getWorksheetPdf(
    @Query("worksheetId") worksheetId: string,
    @Query("templateId") templateId: number,
    @Req() request: Request
  ) {
    return this.service.downloadWorksheet(worksheetId, templateId, request);
  }
}
