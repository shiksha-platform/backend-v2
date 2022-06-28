import { ConfigFormService } from "../adapters/sunbirdrc/configform.adapter";

import {
  CacheInterceptor,
  CACHE_MANAGER,
  Inject,
  Request,
} from "@nestjs/common";
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
  Patch,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  Req,
} from "@nestjs/common";
import { ConfigFormDto } from "./dto/configform.dto";
import { ConfigFormSearchDto } from "./dto/configform-search.dto";
@ApiTags("ConfigForm")
@Controller("configForm")
export class ConfigFormController {
  constructor(
    private service: ConfigFormService,
    @Inject(CACHE_MANAGER) private cacheManager
  ) {}

  @Get("admin/configform/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "ConfigForm detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  getConfigForm(@Param("id") configFormId: string, @Req() request: Request) {
    return this.service.getConfigForm(configFormId, request);
  }

  @Post("admin/configform")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "ConfigForm has been created successfully.",
  })
  @ApiBody({ type: ConfigFormDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createConfigForm(
    @Req() request: Request,
    @Body() configFormDto: ConfigFormDto
  ) {
    return this.service.createConfigForm(request, configFormDto);
  }

  @Put("admin/configform/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "ConfigForm has been updated successfully.",
  })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateConfigForm(
    @Param("id") id: string,
    @Req() request: Request,
    @Body() configFormDto: ConfigFormDto
  ) {
    return await this.service.updateConfigForm(id, request, configFormDto);
  }

  @Post("admin/configform/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "ConfigForm list." })
  @ApiBody({ type: ConfigFormSearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async searchConfigForm(
    @Req() request: Request,
    @Body() configFormSearchDto: ConfigFormSearchDto
  ) {
    return await this.service.searchConfigForm(request, configFormSearchDto);
  }
}
