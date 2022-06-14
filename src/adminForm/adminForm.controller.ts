import { AdminFormService } from "../adapters/sunbirdrc/adminForm.adapter";

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
import { AdminFormDto } from "./dto/adminForm.dto";
import { AdminFormSearchDto } from "./dto/adminForm-search.dto";
@ApiTags("AdminForm")
@Controller("adminForm")
export class AdminFormController {
  constructor(
    private service: AdminFormService,
    @Inject(CACHE_MANAGER) private cacheManager
  ) {}

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "AdminForm detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  getAdminForm(@Param("id") adminFormId: string, @Req() request: Request) {
    return this.service.getAdminForm(adminFormId, request);
  }

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "AdminForm has been created successfully.",
  })
  @ApiBody({ type: AdminFormDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createAdminForm(
    @Req() request: Request,
    @Body() adminFormDto: AdminFormDto
  ) {
    return this.service.createAdminForm(request, adminFormDto);
  }

  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "AdminForm has been updated successfully.",
  })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateAdminForm(
    @Param("id") id: string,
    @Req() request: Request,
    @Body() adminFormDto: AdminFormDto
  ) {
    return await this.service.updateAdminForm(id, request, adminFormDto);
  }

  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "AdminForm list." })
  @ApiBody({ type: AdminFormSearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async searchAdminForm(
    @Req() request: Request,
    @Body() adminFormSearchDto: AdminFormSearchDto
  ) {
    return await this.service.searchAdminForm(request, adminFormSearchDto);
  }
}
