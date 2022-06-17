import {
  ApiBasicAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import {
  Body,
  CacheInterceptor,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  SerializeOptions,
  UseInterceptors,
  Request,
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
  @ApiBody({ type: WorksheetSearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async searchWorksheet(
    @Req() request: Request,
    @Body() worksheetSearchDto: WorksheetSearchDto
  ) {
    return await this.service.searchWorksheet(request, worksheetSearchDto);
  }
}
