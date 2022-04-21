import { HttpModule } from "@nestjs/axios";
import { CacheModule, Module } from "@nestjs/common";
import { HolidayService } from "src/adapters/default/holiday.adapter";
import { HolidayController } from "./holiday.controller";

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: 900,
    }),
  ],
  controllers: [HolidayController],
  providers: [HolidayService],
})
export class HolidayModule {}
