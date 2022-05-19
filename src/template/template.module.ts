import { CacheModule, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { TemplateService } from "src/adapters/default/template.adapter";
import { TemplateController } from "./template.controller";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [TemplateController],
  providers: [TemplateService],
})
export class TemplateModule {}
