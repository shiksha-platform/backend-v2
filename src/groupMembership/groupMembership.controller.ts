import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { GroupMembershipService } from "../adapters/default/groupMembership.adapter";

@Controller("group-membership")
export class GroupMembershipController {
  constructor(
    private readonly groupMembershipService: GroupMembershipService
  ) {}
}
