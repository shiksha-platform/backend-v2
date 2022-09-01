import { CacheModule, Module } from "@nestjs/common";
import { SchoolController } from "./school.controller";
import {
  SchoolService,
  SunbirdSchoolToken,
} from "../adapters/sunbirdrc/school.adapter";
import { HttpModule } from "@nestjs/axios";
import {
  EsamwadSchoolService,
  EsamwadSchoolToken,
} from "src/adapters/esamwad/school.adapter";
import {
  HasuraSchoolToken,
  SchoolHasuraService,
} from "src/adapters/hasura/school.adapter";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [SchoolController],
  providers: [
    SchoolService,
    EsamwadSchoolService,
    { provide: SunbirdSchoolToken, useClass: SchoolService },
    { provide: HasuraSchoolToken, useClass: SchoolHasuraService },
    { provide: EsamwadSchoolToken, useClass: EsamwadSchoolService },
  ],
})
export class SchoolModule {}
