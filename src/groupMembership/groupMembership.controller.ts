import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  Req,
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
import { GroupMembershipService } from "../adapters/default/groupMembership.adapter";
import { GroupMembershipDto } from "./dto/groupMembership.dto";
import { GroupMembershipSearchDto } from "./dto/groupMembership-search.dto";
@ApiTags("GroupMembership")
@Controller("groupMembership")
export class GroupMembershipController {
  constructor(private readonly service: GroupMembershipService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("/:id")
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "GroupMembership detail." })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getGroupMembership(
    @Param("id") id: string,
    @Req() request: Request
  ) {
    return this.service.getGroupMembership(id, request);
  }

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "GroupMembership has been created successfully.",
  })
  @ApiBody({ type: GroupMembershipDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createGroup(
    @Req() request: Request,
    @Body() groupMembershipDto: GroupMembershipDto
  ) {
    return this.service.createGroupMembership(request, groupMembershipDto);
  }

  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "GroupMembership has been updated successfully.",
  })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateGroup(
    @Param("id") id: string,
    @Req() request: Request,
    @Body() groupMembershipDto: GroupMembershipDto
  ) {
    return await this.service.updateGroupMembership(
      id,
      request,
      groupMembershipDto
    );
  }

  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "GroupMembership list." })
  @ApiBody({ type: GroupMembershipSearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async searchStudent(
    @Req() request: Request,
    @Body() groupMembershipSearchDto: GroupMembershipSearchDto
  ) {
    return await this.service.searchGroupMembership(
      request,
      groupMembershipSearchDto
    );
  }
}
