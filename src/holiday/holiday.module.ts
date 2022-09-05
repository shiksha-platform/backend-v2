import { HttpModule } from "@nestjs/axios";
import { CacheModule, Module } from "@nestjs/common";
import {
  HasuraHolidayService,
  HasuraHolidayToken,
} from "src/adapters/hasura/holiday.adapter";
import {
  SunbirdHolidayService,
  SunbirdHolidayToken,
} from "src/adapters/sunbirdrc/holiday.adapter";
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
  providers: [
    { provide: SunbirdHolidayToken, useClass: SunbirdHolidayService },
    { provide: HasuraHolidayToken, useClass: HasuraHolidayService },
  ],
})
export class HolidayModule {}
