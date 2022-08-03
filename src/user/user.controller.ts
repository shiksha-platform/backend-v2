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
  CacheInterceptor,
  Inject,
  Query,
} from "@nestjs/common";
import {
  SunbirdUserToken,
  UserService,
} from "../adapters/sunbirdrc/user.adapter";
import { Request } from "@nestjs/common";
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBasicAuth,
  ApiQuery,
} from "@nestjs/swagger";

import { UserDto } from "./dto/user.dto";
import { UserSearchDto } from "./dto/user-search.dto";
import { IServicelocator } from "src/adapters/userservicelocator";
@ApiTags("User")
@Controller("teacher")
export class UserController {
  constructor(
    private readonly service: UserService,
    @Inject(EsamwadUserToken) private eSamwadProvider: IServicelocator,
    @Inject(SunbirdUserToken) private sunbirdProvider: IServicelocator
  ) {}

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "User detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getUser(@Param("id") id: string, @Req() request: Request) {
    return this.service.getUser(id, request);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "User detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getUserByAuth(@Req() request: Request) {
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvider.getUserByAuth(request);
    } else {
      return this.eSamwadProvider.getUserByAuth(request);
    }
  }

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "User has been created successfully." })
  @ApiBody({ type: UserDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createUser(
    @Req() request: Request,
    @Body() teacherDto: UserDto
  ) {
    return this.service.createUser(request, teacherDto);
  }

  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "User has been updated successfully." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateUser(
    @Param("id") id: string,
    @Req() request: Request,
    @Body() teacherDto: UserDto
  ) {
    return await this.service.updateUser(id, request, teacherDto);
  }
  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "User list." })
  @ApiBody({ type: UserSearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async searchUser(
    @Req() request: Request,
    @Body() teacherSearchDto: UserSearchDto
  ) {
    return await this.service.searchUser(request, teacherSearchDto);
  }

  @Get("teachersegment/:schoolId")
  // @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "User list." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiQuery({ name: "templateId", required: false })
  public async teacherSegment(
    @Param("schoolId") schoolId: string,
    @Query("templateId") templateId: string,
    @Req() request: Request
  ) {
    return await this.service.teacherSegment(schoolId, templateId, request);
  }
}
function EsamwadUserToken(EsamwadUserToken: any) {
  throw new Error("Function not implemented.");
}
