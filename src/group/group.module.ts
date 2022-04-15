import { Module } from "@nestjs/common";
import { GroupController } from "./group.controller";
import { GroupService } from "../adapters/default/group.adapter";
import { HttpModule } from "@nestjs/axios";
import { GroupMembershipService } from "src/adapters/default/groupMembership.adapter";
@Module({
  imports: [HttpModule],
  controllers: [GroupController],
  providers: [GroupService, GroupMembershipService],
})
export class GroupModule {}
