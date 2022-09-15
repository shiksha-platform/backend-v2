import { Injectable } from "@nestjs/common";
import { HasuraLikeService } from "src/adapters/hasura/like.adapter";
import { IServicelocator } from "src/adapters/likeservicelocator";
import { SunbirdLikeService } from "src/adapters/sunbirdrc/like.adapter";

@Injectable()
export class LikeAdapter {
  constructor(
    private sunbirdProvider: SunbirdLikeService,
    private hasuraProvider: HasuraLikeService
  ) {}
  buildLikeAdapter(): IServicelocator {
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
