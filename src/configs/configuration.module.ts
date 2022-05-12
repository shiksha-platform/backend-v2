import { CacheModule, Module } from "@nestjs/common";
import { ConfigController } from "./config.controller";
import { ConfigService } from "../adapters/default/config.adapter";
import { HttpModule } from "@nestjs/axios";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [ConfigController],
  providers: [ConfigService],
})
export class ConfigurationModule {}
