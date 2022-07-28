import { HttpModule } from "@nestjs/axios";
import { CacheModule, Module } from "@nestjs/common";
import { MonitorTrackingService } from "src/adapters/sunbirdrc/monitorTracking.adapter";
import { MonitorTrackingController } from "./monitorTracking.controller";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [MonitorTrackingController],
  providers: [MonitorTrackingService],
})
export class MonitorTrackingModule {}
