import { CacheModule, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ScheduleModule } from "@nestjs/schedule";
import { ContentPagesController } from './contentPages.controller';
import {
  ContentPagesEsamwadService,
  ESamwadContentPagesToken,
} from "src/adapters/esamwad/contentPages.adapter";

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
    ContentPagesEsamwadService, {
      provide: ESamwadContentPagesToken,
      useClass: ContentPagesEsamwadService
    }
  ],
  controllers: [ContentPagesController],
})
export class ContentPagesModule { }
