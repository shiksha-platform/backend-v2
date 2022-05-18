import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBasicAuth,
} from "@nestjs/swagger";
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
  Request,
  CacheInterceptor,
} from "@nestjs/common";
import { TemplateDto } from "./dto/template.dto";
import { TemplateSearchDto } from "./dto/template-search.dto";
import { TemplateService } from "src/adapters/default/template.adapter";
import { TemplateContentDto } from "./dto/template-content.dto";

@ApiTags("Template")
@Controller("template")
export class TemplateController {
  constructor(private service: TemplateService) {}

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Template has been created successfully.",
  })
  @ApiBody({ type: TemplateDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async tamplate(
    @Req() request: Request,
    @Body() templateDto: TemplateDto
  ) {
    return this.service.createTemplate(request, templateDto);
  }

  @Post("template/content")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Template Content has been created successfully.",
  })
  @ApiBody({ type: TemplateContentDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async tamplateContent(
    @Req() request: Request,
    @Body() templateContentDto: TemplateContentDto
  ) {
    return this.service.createTemplateContent(request, templateContentDto);
  }

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Template detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getTemplate(@Param("id") id: string, @Req() request: Request) {
    return this.service.getTemplate(id, request);
  }

  @Get("content/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Template Content detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getTemplateContent(
    @Param("id") id: string,
    @Req() request: Request
  ) {
    return this.service.getTemplateContent(id, request);
  }

  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Template has been updated successfully.",
  })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateTemplate(
    @Param("id") id: string,
    @Req() request: Request,
    @Body() templateDto: TemplateDto
  ) {
    return await this.service.updateTemplate(id, request, templateDto);
  }

  @Put("content/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Template content has been updated successfully.",
  })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateTemplateContent(
    @Param("id") id: string,
    @Req() request: Request,
    @Body() templateContentDto: TemplateContentDto
  ) {
    return await this.service.updateTemplateContent(
      id,
      request,
      templateContentDto
    );
  }

  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Template list." })
  @ApiBody({ type: TemplateSearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async searchTemplate(
    @Req() request: Request,
    @Body() templateSearchDto: TemplateSearchDto
  ) {
    return await this.service.searchTemplate(request, templateSearchDto);
  }
}
