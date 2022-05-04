import { ConfigService } from "../adapters/default/config.adapter";
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
  Query,
  CacheInterceptor,
} from "@nestjs/common";
import { ConfigSearchDto } from "./dto/config-search.dto";
import { Request } from "@nestjs/common";
import { ConfigDto } from "./dto/config.dto";

@ApiTags("Config")
@Controller("config")
export class ConfigController {
  constructor(
    private service: ConfigService
  ) {}


  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Config detail" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getConfig(@Param("id") configId: string, @Req() request: Request) {
    return this.service.getConfig(configId, request);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Config detail" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getConfigForTeacher(@Req() request: Request) {
    return this.service.getConfigForTeacher(request);
  }

  @Get("Module/:module")
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Config detail by module" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  public async findConfigByModule(
    @Param("module") module: string,
    @Req() request: Request
  ) {
    return this.service.findConfigByModule(module, request);
  }

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Config has been created successfully." })
  @ApiBody({ type: ConfigDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createConfig(
    @Req() request: Request,
    @Body() configDto: ConfigDto
  ) {
    return this.service.createConfig(request, configDto);
  }

  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Config has been updated successfully." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateConfig(
    @Param("id") configId: string,
    @Req() request: Request,
    @Body() configDto: ConfigDto
  ) {
    return await this.service.updateConfig(configId, request, configDto);
  }

  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Config list." })
  @ApiBody({ type: ConfigSearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async searchConfig(
    @Req() request: Request,
    @Body() configSearchDto: ConfigSearchDto
  ) {
    return await this.service.searchConfig(request, configSearchDto);
  }
}
