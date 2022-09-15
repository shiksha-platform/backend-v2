import {
  ApiTags,
  ApiBody,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBasicAuth,
} from "@nestjs/swagger";
import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  Req,
} from "@nestjs/common";
import { Request } from "@nestjs/common";
import { ConfigDto } from "./dto/config.dto";
import { ConfigsAdapter } from "./configsadapter";

@ApiTags("Config")
@Controller("config")
export class ConfigController {
  constructor(private configsAdapter: ConfigsAdapter) {}

  @Get(":module/all")
  @ApiBasicAuth("access-token")
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiCreatedResponse({ description: "Config detail" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getConfig(@Req() request: Request) {
    return this.configsAdapter.buildConfigsAdapter().getConfig(request);
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
    return this.configsAdapter
      .buildConfigsAdapter()
      .createConfig(request, configDto);
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
    return this.configsAdapter
      .buildConfigsAdapter()
      .createModuleConfigs(request, configDto);
  }
}
