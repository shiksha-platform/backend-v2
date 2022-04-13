import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { GroupMembershipService } from "../adapters/default/groupMembership.adapter";
import { GroupMembershipController } from "./groupMembership.controller";

@Module({
  imports: [HttpModule],
  controllers: [GroupMembershipController],
  providers: [GroupMembershipService],
})
export class GroupMembershipModule {}
