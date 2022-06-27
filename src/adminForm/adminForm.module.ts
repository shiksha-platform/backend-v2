import { CacheModule, Module } from "@nestjs/common";
import { AdminFormController } from "./adminForm.controller";
import { AdminFormService } from "../adapters/sunbirdrc/adminForm.adapter";
import { HttpModule } from "@nestjs/axios";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [AdminFormController],
  providers: [AdminFormService],
})
export class AdminFormModule {}
