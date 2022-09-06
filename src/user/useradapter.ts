import { Injectable } from "@nestjs/common";
import { EsamwadUserService } from "src/adapters/esamwad/user.adapter";
import { UserService } from "src/adapters/sunbirdrc/user.adapter";
import { IServicelocator } from "src/adapters/userservicelocator";

@Injectable()
export class UserAdapter {
  constructor(
    private eSamwadProvider: EsamwadUserService,
    private sunbirdProvider: UserService
  ) {}
  buildUserAdapter(): IServicelocator {
    let adapter: IServicelocator;

    switch (process.env.REGISTYADAPTER) {
      case "esamwad":
        adapter = this.eSamwadProvider;
        break;
      case "sunbird":
        adapter = this.sunbirdProvider;
        break;
    }
    return adapter;
  }
}
