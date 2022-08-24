import { SunbirdConfigToken } from "../adapters/sunbirdrc/config.adapter";
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
  Inject,
} from "@nestjs/common";
import { ConfigSearchDto } from "./dto/config-search.dto";
import { Request } from "@nestjs/common";
import { ConfigDto } from "./dto/config.dto";
import { IServicelocator } from "src/adapters/configservicelocator";
import { HasuraConfigToken } from "src/adapters/hasura/config.adapter";

@ApiTags("Config")
@Controller("config")
export class ConfigController {
  constructor(
    @Inject(HasuraConfigToken) private hasuraProvider: IServicelocator,
    @Inject(SunbirdConfigToken) private sunbirdProvider: IServicelocator
  ) {}

  @Get(":module/all")
  @ApiBasicAuth("access-token")
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiCreatedResponse({ description: "Config detail" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getConfig(@Req() request: Request) {
    if (process.env.ADAPTERSOURCE === "hasura") {
      return this.hasuraProvider.getConfig(request);
    } else if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvider.getConfig(request);
    }
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
    if (process.env.ADAPTERSOURCE === "hasura") {
      return this.hasuraProvider.createConfig(request, configDto);
    } else if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvider.createConfig(request, configDto);
    }
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
    if (process.env.ADAPTERSOURCE === "hasura") {
      return this.hasuraProvider.createModuleConfigs(request, configDto);
    } else if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvider.createModuleConfigs(request, configDto);
    }
  }
}
