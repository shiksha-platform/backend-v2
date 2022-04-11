import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { HolidayService } from "src/adapters/default/holiday.adapter";
import { HolidayController } from "./holiday.controller";

@Module({
  imports: [HttpModule],
  controllers: [HolidayController],
  providers: [HolidayService],
})
export class HolidayModule {}
