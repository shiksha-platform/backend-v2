import { CacheModule, Module } from "@nestjs/common";
import { GroupController } from "./group.controller";
import { HttpModule } from "@nestjs/axios";
import { GroupAdapter } from "./groupadapter";
import { HasuraModule } from "src/adapters/hasura/hasura.module";
import { EsmwadModule } from "src/adapters/esamwad/esamwad.module";
import { SunbirdModule } from "src/adapters/sunbirdrc/subnbird.module";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    SunbirdModule,
    HasuraModule,
    EsmwadModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [GroupController],
  providers: [GroupAdapter],
})
export class GroupModule {}
