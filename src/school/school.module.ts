import { CacheModule, Module } from "@nestjs/common";
import { SchoolController } from "./school.controller";
import { SchoolService } from "../adapters/default/school.adapter";
import { HttpModule } from "@nestjs/axios";
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: 900,
    }),
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
