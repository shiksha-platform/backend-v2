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
import { WorksheetService } from "src/adapters/hasura/worksheet.adapter";
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
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async searchWorksheet(
    @Body() worksheetSearchDto: WorksheetSearchDto,
    @Req() request: Request
  ) {
    return await this.service.searchWorksheet(worksheetSearchDto, request);
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

  @Post(":send/worksheet")
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: " Ok." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "studentIds", required: true })
  @ApiQuery({ name: "teacherId", required: true })
  @ApiQuery({ name: "link", required: true })
  @ApiQuery({ name: "subject", required: true })
  @ApiQuery({ name: "topic", required: true })
  public async sendWorksheet(
    @Query("studentIds") studentIds: [string],
    @Query("teacherId") teacherId: string,
    @Query("link") link: string,
    @Query("subject") subject: string,
    @Query("topic") topic: string,

    @Req()
    request: Request
  ) {
    return this.service.sendWorksheet(
      studentIds,
      teacherId,
      link,
      subject,
      topic,
      request
    );
  }
}
