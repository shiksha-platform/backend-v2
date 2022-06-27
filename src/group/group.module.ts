import { CacheModule, Module } from "@nestjs/common";
import { GroupController } from "./group.controller";
import { GroupService } from "../adapters/sunbirdrc/group.adapter";
import { HttpModule } from "@nestjs/axios";
import { GroupMembershipService } from "src/adapters/sunbirdrc/groupMembership.adapter";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [GroupController],
  providers: [GroupService, GroupMembershipService],
})
export class GroupModule {}
