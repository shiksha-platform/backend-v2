import { Injectable } from "@nestjs/common";
import { IServicelocator } from "src/adapters/commentservicelocator";
import { HasuraCommentService } from "src/adapters/hasura/comment.adapter";
import { SunbirdCommentService } from "src/adapters/sunbirdrc/comment.adapter";

@Injectable()
export class CommentAdapter {
  constructor(
    private sunbirdProvider: SunbirdCommentService,
    private hasuraProvider: HasuraCommentService
  ) {}
  buildCommentAdapter(): IServicelocator {
    let adapter: IServicelocator;

    switch (process.env.ADAPTERSOURCE) {
      case "sunbird":
        adapter = this.sunbirdProvider;
        break;
      case "hasura":
        adapter = this.hasuraProvider;
        break;
    }
    return adapter;
  }
}
