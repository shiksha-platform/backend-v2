import { CacheModule, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { MenuController } from "./menu.controller";
import { MenuService } from "src/adapters/sunbirdrc/menu.adapter";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
