import { HttpModule } from "@nestjs/axios";
import { CacheModule, Module } from "@nestjs/common";
import { RoleService } from "src/adapters/hasura/role.adapter";
import { RoleController } from "./role.controller";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
