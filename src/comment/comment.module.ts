import { HttpModule } from "@nestjs/axios";
import { CacheModule, Module } from "@nestjs/common";
import {
  HasuraCommentService,
  HasuraCommentToken,
} from "src/adapters/hasura/comment.adapter";
import {
  SunbirdCommentService,
  SunbirdCommentToken,
} from "src/adapters/sunbirdrc/comment.adapter";
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
  providers: [
    { provide: SunbirdCommentToken, useClass: SunbirdCommentService },
    { provide: HasuraCommentToken, useClass: HasuraCommentService },
  ],
})
export class CommentModule {}
