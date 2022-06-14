import { ConfigService } from "../adapters/sunbirdrc/config.adapter";
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
  constructor(private service: ConfigService) {}

  @Get(":module/all")
  @ApiBasicAuth("access-token")
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiCreatedResponse({ description: "Config detail" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getConfig(@Req() request: Request) {
    return this.service.getConfig(request);
  }

  @Post("")
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

  @Post(":multipleConfigs")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Config has been created successfully." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createModuleConfigs(
    @Req() request: Request,
    @Body() configDto: [Object]
  ) {
    return this.service.createModuleConfigs(request, configDto);
  }
}
