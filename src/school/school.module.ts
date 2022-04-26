import { CacheModule, Module } from "@nestjs/common";
import { SchoolController } from "./school.controller";
import { SchoolService } from "../adapters/default/school.adapter";
import { HttpModule } from "@nestjs/axios";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
