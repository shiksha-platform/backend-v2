import { HttpModule } from "@nestjs/axios";
import { CacheModule, Module } from "@nestjs/common";
import { CommentService } from "src/adapters/default/comment.adapter";
import { CommentController } from "./comment.controller";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
