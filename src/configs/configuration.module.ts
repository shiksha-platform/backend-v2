import { CacheModule, Module } from "@nestjs/common";
import { ConfigController } from "./config.controller";
import {
  SunbirdConfigService,
  SunbirdConfigToken,
} from "../adapters/sunbirdrc/config.adapter";
import { HttpModule } from "@nestjs/axios";
import {
  HasuraConfigService,
  HasuraConfigToken,
} from "src/adapters/hasura/config.adapter";
import { ConfigsAdapter } from "./configsadapter";
import { HasuraModule } from "src/adapters/hasura/hasura.module";
import { SunbirdModule } from "src/adapters/sunbirdrc/subnbird.module";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    SunbirdModule,
    HasuraModule,
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [ConfigController],
  providers: [ConfigsAdapter],
})
export class ConfigurationModule {}
