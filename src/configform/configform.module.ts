import { CacheModule, Module } from "@nestjs/common";
import { ConfigFormController } from "./configform.controller";
import { ConfigFormService } from "../adapters/sunbirdrc/configform.adapter";
import { HttpModule } from "@nestjs/axios";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [ConfigFormController],
  providers: [ConfigFormService],
})
export class ConfigFormModule {}
