import { HttpModule } from "@nestjs/axios";
import { CacheModule, Module } from "@nestjs/common";
import { HasuraModule } from "src/adapters/hasura/hasura.module";
import { SunbirdModule } from "src/adapters/sunbirdrc/subnbird.module";
import { HolidayController } from "./holiday.controller";
import { HolidayAdapter } from "./holidayadapter";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    SunbirdModule,
    HasuraModule,
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [HolidayController],
  providers: [HolidayAdapter],
})
export class HolidayModule {}
