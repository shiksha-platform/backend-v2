import { CacheModule, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { WorksheetController } from "./worksheet.controller";
import { WorksheetService } from "src/adapters/hasura/worksheet.adapter";
import { TemplateService } from "src/adapters/sunbirdrc/template.adapter";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [WorksheetController],
  providers: [WorksheetService, TemplateService],
})
export class WorksheetModule {}
