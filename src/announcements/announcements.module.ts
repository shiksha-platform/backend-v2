import { CacheModule, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ScheduleModule } from "@nestjs/schedule";
import {
  AnnouncementsEsamwadService,
  ESamwadAnnouncementsToken,
} from "../adapters/esamwad/announcements.adapter";
import { AnnouncementsController } from "./announcements.controller";

const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
    ScheduleModule.forRoot(),
  ],
  providers: [
    AnnouncementsEsamwadService,
    {
      provide: ESamwadAnnouncementsToken,
      useClass: AnnouncementsEsamwadService,
    },
  ],
  controllers: [AnnouncementsController],
})
export class AnnouncementsModule {}
