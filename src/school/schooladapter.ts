import { Injectable } from "@nestjs/common";
import { EsamwadSchoolService } from "src/adapters/esamwad/school.adapter";
import { SchoolHasuraService } from "src/adapters/hasura/school.adapter";
import { IServicelocator } from "src/adapters/schoolservicelocator";
import { SchoolService } from "src/adapters/sunbirdrc/school.adapter";

@Injectable()
export class SchoolAdapter {
  constructor(
    private eSamwadProvider: EsamwadSchoolService,
    private sunbirdProvider: SchoolService,
    private hasuraProvider: SchoolHasuraService
  ) {}
  buildSchoolAdapter(): IServicelocator {
    let adapter: IServicelocator;

    switch (process.env.ADAPTERSOURCE) {
      case "esamwad":
        adapter = this.eSamwadProvider;
        break;
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
