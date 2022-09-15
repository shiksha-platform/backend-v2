import { CacheModule, Module } from "@nestjs/common";
import { AttendanceController } from "./attendance.controller";
import { ScheduleModule } from "@nestjs/schedule";
import { AttendaceAdapter } from "./attendanceadapter";
import { HasuraModule } from "src/adapters/hasura/hasura.module";
import { SunbirdModule } from "src/adapters/sunbirdrc/subnbird.module";
import { EsmwadModule } from "src/adapters/esamwad/esamwad.module";

const ttl = process.env.TTL as never;
@Module({
  imports: [
    SunbirdModule,
    HasuraModule,
    EsmwadModule,
    CacheModule.register({
      ttl: ttl,
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AttendanceController],
  providers: [AttendaceAdapter],
})
export class AttendanceModule {}
