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
  Query,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBasicAuth,
  ApiQuery,
} from "@nestjs/swagger";
import { Request } from "@nestjs/common";
import { RoleDto } from "./dto/role.dto";
import { RoleService } from "src/adapters/hasura/role.adapter";

@ApiTags("Role")
@Controller("role")
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "role detail." })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  getRole(@Param("id") roleId: string, @Req() request: Request) {
    return this.service.getRole(roleId, request);
  }

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Role has been created successfully.",
  })
  @ApiBody({ type: RoleDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async creatRole(@Req() request: Request, @Body() roleDto: RoleDto) {
    return this.service.createRole(request, roleDto);
  }

  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Role has been updated successfully.",
  })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateRole(
    @Param("id") roleId: string,
    @Req() request: Request,
    @Body() roleDto: RoleDto
  ) {
    return await this.service.updateRole(roleId, request, roleDto);
  }

  @Post("/search")
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: " Ok." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "limit", required: false })
  @ApiQuery({ name: "roleId", required: false })
  @ApiQuery({ name: "title", required: false })
  @ApiQuery({ name: "parentId", required: false })
  @ApiQuery({ name: "status", required: false })
  public async searchRole(
    @Query("limit") limit: string,
    @Query("roleId") roleId: string,
    @Query("title") title: string,
    @Query("parentId") parentId: string,
    @Query("status") status: string,
    @Req() request: Request
  ) {
    return this.service.searchRole(
      limit,
      roleId,
      title,
      parentId,
      status,
      request
    );
  }
}
