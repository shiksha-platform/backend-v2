import { Injectable } from "@nestjs/common";
import { IServicelocator } from "src/adapters/adminformservicelocator";

import { HasuraAdminFormService } from "src/adapters/hasura/adminForm.adapter";
import { SunbirdAdminFormService } from "src/adapters/sunbirdrc/adminForm.adapter";

@Injectable()
export class AdminFormAdapter {
  constructor(
    private sunbirdProvider: SunbirdAdminFormService,
    private hasuraProvider: HasuraAdminFormService
  ) {}
  buildAdminFormAdapter(): IServicelocator {
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
