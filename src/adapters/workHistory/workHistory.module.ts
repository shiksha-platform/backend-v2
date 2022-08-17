import { CacheModule, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { WorkHistoryService } from "../hasura/workhistory.adapter";
import { WorkHistoryController } from "./workHistory.controller";

const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [WorkHistoryController],
  providers: [WorkHistoryService],
})
export class WorkHistoryModule {}
