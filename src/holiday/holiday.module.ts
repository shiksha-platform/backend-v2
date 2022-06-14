import { HttpModule } from "@nestjs/axios";
import { CacheModule, Module } from "@nestjs/common";
import { HolidayService } from "src/adapters/sunbirdrc/holiday.adapter";
import { HolidayController } from "./holiday.controller";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [HolidayController],
  providers: [HolidayService],
})
export class HolidayModule {}
