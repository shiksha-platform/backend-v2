import { HttpModule } from "@nestjs/axios";
import { CacheModule, Module } from "@nestjs/common";
import {
  HasuraLikeService,
  HasuraLikeToken,
} from "src/adapters/hasura/like.adapter";
import {
  SunbirdLikeService,
  SunbirdLikeToken,
} from "src/adapters/sunbirdrc/like.adapter";
import { LikeController } from "./like.controller";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [LikeController],
  providers: [
    { provide: SunbirdLikeToken, useClass: SunbirdLikeService },
    { provide: HasuraLikeToken, useClass: HasuraLikeService },
  ],
})
export class LikeModule {}
