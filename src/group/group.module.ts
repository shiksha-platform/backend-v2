import { CacheModule, Module } from "@nestjs/common";
import { GroupController } from "./group.controller";
import { GroupService } from "../adapters/sunbirdrc/group.adapter";
import { HttpModule } from "@nestjs/axios";
import {
  GroupMembershipService,
  SunbirdGroupMembershipToken,
} from "src/adapters/sunbirdrc/groupMembership.adapter";
import {
  EsamwadGroupMembershipToken,
  GroupMembershipEsamwadService,
} from "src/adapters/esamwad/groupMembership.adapter";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [GroupController],
  providers: [
    GroupService,
    GroupMembershipService,
    GroupMembershipEsamwadService,

    { provide: SunbirdGroupMembershipToken, useClass: GroupMembershipService },
    {
      provide: EsamwadGroupMembershipToken,
      useClass: GroupMembershipEsamwadService,
    },
  ],
})
export class GroupModule {}
