import { CacheModule, Module } from "@nestjs/common";
import { GroupController } from "./group.controller";
import {
  SunbirdGroupService,
  SunbirdGroupToken,
} from "../adapters/sunbirdrc/group.adapter";
import { HttpModule } from "@nestjs/axios";

import {
  EsamwadGroupService,
  EsamwadGroupToken,
} from "src/adapters/esamwad/group.adapter";
import {
  HasuraGroupService,
  HasuraGroupToken,
} from "src/adapters/hasura/group.adapter";
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
    SunbirdGroupService,
    EsamwadGroupService,

    { provide: SunbirdGroupToken, useClass: SunbirdGroupService },
    { provide: HasuraGroupToken, useClass: HasuraGroupService },
    {
      provide: EsamwadGroupToken,
      useClass: EsamwadGroupService,
    },
  ],
})
export class GroupModule {}
