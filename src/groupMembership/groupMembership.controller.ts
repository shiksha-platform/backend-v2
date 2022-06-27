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
import { GroupMembershipService } from "../adapters/sunbirdrc/groupMembership.adapter";
import { GroupMembershipDto } from "./dto/groupMembership.dto";
import { GroupMembershipSearchDto } from "./dto/groupMembership-search.dto";
@ApiTags("GroupMembership")
@Controller("groupMembership")
export class GroupMembershipController {
  constructor(private readonly service: GroupMembershipService) {}
}
