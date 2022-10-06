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
import { AdminFormAdapter } from "./adminformadapter";
@ApiTags("AdminForm")
@Controller("adminForm")
export class AdminFormController {
  constructor(
    private adminFormAdapter: AdminFormAdapter,
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
    return this.adminFormAdapter
      .buildAdminFormAdapter()
      .getAdminForm(adminFormId, request);
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
    return this.adminFormAdapter
      .buildAdminFormAdapter()
      .createAdminForm(request, adminFormDto);
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
    return await this.adminFormAdapter
      .buildAdminFormAdapter()
      .updateAdminForm(id, request, adminFormDto);
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
    return await this.adminFormAdapter
      .buildAdminFormAdapter()
      .searchAdminForm(request, adminFormSearchDto);
  }
}
