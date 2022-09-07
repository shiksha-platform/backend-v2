import {
  ApiBasicAuth,
  ApiBody,
  ApiQuery,
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
  Query,
  Param,
  Post,
  Req,
  SerializeOptions,
  UseInterceptors,
  Request,
} from "@nestjs/common";
import { TemplateService } from "src/adapters/sunbirdrc/template.adapter";
import { TemplateProcessDto } from "./dto/template-process.dto";
import { TemplateCreateDto } from "./dto/template-create.dto";

@ApiTags("Template")
@Controller("template")
export class TemplateController {
  constructor(private service: TemplateService) {}

  @Post("create")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: " Template has been created successfully.",
  })
  @ApiBody({ type: TemplateCreateDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createTemplate(
    @Req() request: Request,
    @Body() TemplateCreateDto: TemplateCreateDto
  ) {
    return this.service.createTemplate(request, TemplateCreateDto);
  }

  @Post("process")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: " template process." })
  @ApiBody({ type: TemplateProcessDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async processTemplate(
    @Req() request: Request,
    @Body() TemplateProcessDto: TemplateProcessDto
  ) {
    return await this.service.processTemplate(request, TemplateProcessDto);
  }

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: " template detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getTemplate(@Param("id") id: string, @Req() request: Request) {
    return this.service.getTemplate(id, request);
  }
  @Get(":/searchByTag")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  //@ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Get all Questions detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "tag", required: true })
  public async getTemplates(
    @Query("tag") tag: string,
    @Req() request: Request
  ) {
    return this.service.getTemplateByTag(tag, request);
  }
}
