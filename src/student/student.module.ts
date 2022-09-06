import { CacheModule, Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { HttpModule } from "@nestjs/axios";
import { StudentAdapter } from "./studentadapter";
import { EsmwadModule } from "src/adapters/esamwad/esamwad.module";
import { SunbirdModule } from "src/adapters/sunbirdrc/subnbird.module";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    EsmwadModule,
    SunbirdModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [StudentController],
  providers: [StudentAdapter],
})
export class StudentModule {}
