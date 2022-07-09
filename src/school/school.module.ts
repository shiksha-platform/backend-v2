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
    { provide: EsamwadSchoolToken, useClass: EsamwadSchoolService },
  ],
})
export class SchoolModule {}
