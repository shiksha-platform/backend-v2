import { CacheModule, Module } from "@nestjs/common";
import { SchoolController } from "./school.controller";
import { HttpModule } from "@nestjs/axios";
import { SchoolAdapter } from "./schooladapter";
import { HasuraModule } from "src/adapters/hasura/hasura.module";
import { SunbirdModule } from "src/adapters/sunbirdrc/subnbird.module";
import { EsmwadModule } from "src/adapters/esamwad/esamwad.module";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    SunbirdModule,
    HasuraModule,
    EsmwadModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [SchoolController],
  providers: [SchoolAdapter],
})
export class SchoolModule {}
