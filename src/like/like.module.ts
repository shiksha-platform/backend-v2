import { HttpModule } from "@nestjs/axios";
import { CacheModule, Module } from "@nestjs/common";
import { LikeService } from "src/adapters/sunbirdrc/like.adapter";
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
  providers: [LikeService],
})
export class LikeModule {}
