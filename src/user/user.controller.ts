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
import { EsamwadUserToken } from "src/adapters/esamwad/user.adapter";
import { UserAdapter } from "./useradapter";
@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(
    private readonly service: UserService,
    private userAdapter: UserAdapter
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
    return this.userAdapter.buildUserAdapter().getUser(id, request);
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
    return this.userAdapter.buildUserAdapter().getUserByAuth(request);
  }

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "User has been created successfully." })
  @ApiBody({ type: UserDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createUser(@Req() request: Request, @Body() userDto: UserDto) {
    return this.userAdapter.buildUserAdapter().createUser(request, userDto);
  }

  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "User has been updated successfully." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateUser(
    @Param("id") id: string,
    @Req() request: Request,
    @Body() userDto: UserDto
  ) {
    return await this.userAdapter
      .buildUserAdapter()
      .updateUser(id, request, userDto);
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
    @Body() userSearchDto: UserSearchDto
  ) {
    return await this.userAdapter
      .buildUserAdapter()
      .searchUser(request, userSearchDto);
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
    return await this.userAdapter
      .buildUserAdapter()
      .teacherSegment(schoolId, templateId, request);
  }
}
