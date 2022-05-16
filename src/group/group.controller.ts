import { GroupService } from "../adapters/default/group.adapter";
import { GroupMembershipService } from "src/adapters/default/groupMembership.adapter";
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
import { GroupSearchDto } from "./dto/group-search.dto";
import { Request } from "@nestjs/common";
import { GroupDto } from "./dto/group.dto";

@ApiTags("Group")
@Controller("group")
export class GroupController {
  constructor(
    private service: GroupService,
    private membershipService: GroupMembershipService
  ) {}

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Group detail" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getGroup(@Param("id") groupId: string, @Req() request: Request) {
    return this.service.getGroup(groupId, request);
  }

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Group has been created successfully." })
  @ApiBody({ type: GroupDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createGroup(
    @Req() request: Request,
    @Body() groupDto: GroupDto
  ) {
    return this.service.createGroup(request, groupDto);
  }

  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Group has been updated successfully." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateGroup(
    @Param("id") groupId: string,
    @Req() request: Request,
    @Body() groupDto: GroupDto
  ) {
    return await this.service.updateGroup(groupId, request, groupDto);
  }

  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Group list." })
  @ApiBody({ type: GroupSearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async searchStudent(
    @Req() request: Request,
    @Body() groupSearchDto: GroupSearchDto
  ) {
    return await this.service.searchGroup(request, groupSearchDto);
  }

  @Get(":groupId/participants")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Group detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  public async findMembersOfGroup(
    @Param("groupId") id: string,
    @Query("role") role: string,
    @Req() request: Request
  ) {
    return await this.membershipService.findMembersOfGroup(id, role, request);
  }

  @Get("participant/:userId")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Group detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  public async getGroupsByUserId(
    @Param("userId") id: string,
    @Query("role") role: string,
    @Req() request: Request
  ) {
    return await this.membershipService.findGroupsByUserId(id, role, request);
  }
}
