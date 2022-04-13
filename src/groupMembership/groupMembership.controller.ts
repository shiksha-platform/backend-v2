import {
  Controller,
  Get,
  Post,
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
  ) {}
}
