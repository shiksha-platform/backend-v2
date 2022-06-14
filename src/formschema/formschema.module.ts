import { CacheModule, Module } from "@nestjs/common";
import { FormschemaController } from "./formschema.controller";
import { FormschemaService } from "../adapters/sunbirdrc/formschema";
import { HttpModule } from "@nestjs/axios";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [FormschemaController],
  providers: [FormschemaService],
})
export class FormschemaModule {}
