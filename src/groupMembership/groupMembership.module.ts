import { Module } from "@nestjs/common";
import { GroupMembershipService } from "../adapters/default/groupMembership.adapter";
import { GroupMembershipController } from "./groupMembership.controller";

@Module({
  controllers: [GroupMembershipController],
  providers: [GroupMembershipService],
})
export class GroupMembershipModule {}
