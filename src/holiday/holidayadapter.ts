import { Injectable } from "@nestjs/common";
import { HasuraHolidayService } from "src/adapters/hasura/holiday.adapter";
import { IServicelocator } from "src/adapters/holidayservicelocator";
import { SunbirdHolidayService } from "src/adapters/sunbirdrc/holiday.adapter";

@Injectable()
export class HolidayAdapter {
  constructor(
    private sunbirdProvider: SunbirdHolidayService,
    private hasuraProvider: HasuraHolidayService
  ) {}
  buildHolidayAdapter(): IServicelocator {
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
