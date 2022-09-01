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
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [ConfigController],
  providers: [
    SunbirdConfigService,
    { provide: HasuraConfigToken, useClass: HasuraConfigService },
    { provide: SunbirdConfigToken, useClass: SunbirdConfigService },
  ],
})
export class ConfigurationModule {}
