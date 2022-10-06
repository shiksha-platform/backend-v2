import { CacheModule, Module } from "@nestjs/common";
import { AdminFormController } from "./adminForm.controller";
import { HttpModule } from "@nestjs/axios";
import { SunbirdModule } from "src/adapters/sunbirdrc/subnbird.module";
import { HasuraModule } from "src/adapters/hasura/hasura.module";
import { AdminFormAdapter } from "./adminformadapter";
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
  controllers: [AdminFormController],
  providers: [AdminFormAdapter],
})
export class AdminFormModule {}
