import { Injectable } from "@nestjs/common";
import { IServicelocator } from "src/adapters/configservicelocator";
import { HasuraConfigService } from "src/adapters/hasura/config.adapter";
import { SunbirdConfigService } from "src/adapters/sunbirdrc/config.adapter";

@Injectable()
export class ConfigsAdapter {
  constructor(
    private sunbirdProvider: SunbirdConfigService,
    private hasuraProvider: HasuraConfigService
  ) {}
  buildConfigsAdapter(): IServicelocator {
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
