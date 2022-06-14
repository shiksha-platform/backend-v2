import { FormschemaService } from "../adapters/sunbirdrc/formschema";

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
import { FormschemaDto } from "./dto/formschema.dto";
import { FormschemaSearchDto } from "./dto/formschema-search.dto";
@ApiTags("Formschema")
@Controller("formschema")
export class FormschemaController {
  constructor(
    private service: FormschemaService,
    @Inject(CACHE_MANAGER) private cacheManager
  ) {}

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Formschema detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  getFormschema(@Param("id") formschemaId: string, @Req() request: Request) {
    return this.service.getFormschema(formschemaId, request);
  }

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Formschema has been created successfully.",
  })
  @ApiBody({ type: FormschemaDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createFormschema(
    @Req() request: Request,
    @Body() formschemaDto: FormschemaDto
  ) {
    return this.service.createFormschema(request, formschemaDto);
  }

  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Formschema has been updated successfully.",
  })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateFormschema(
    @Param("id") id: string,
    @Req() request: Request,
    @Body() formschemaDto: FormschemaDto
  ) {
    return await this.service.updateFormschema(id, request, formschemaDto);
  }

  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Formschema list." })
  @ApiBody({ type: FormschemaSearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async searchFormschema(
    @Req() request: Request,
    @Body() formschemaSearchDto: FormschemaSearchDto
  ) {
    return await this.service.searchFormschema(request, formschemaSearchDto);
  }
}
