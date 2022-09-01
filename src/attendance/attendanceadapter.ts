import { Inject, Injectable } from "@nestjs/common";
import { IServicelocator } from "src/adapters/attendanceservicelocator";
import { AttendanceEsamwadService } from "src/adapters/esamwad/attendance.adapter";
import { AttendanceHasuraService } from "src/adapters/hasura/attendance.adapter";
import { AttendanceService } from "src/adapters/sunbirdrc/attendance.adapter";

@Injectable()
export class AttendaceAdapter {
  constructor(
    private eSamwadProvider: AttendanceEsamwadService,
    private hasuraProvider: AttendanceHasuraService,
    private sunbirdProvider: AttendanceService
  ) {}
  buildAttenceAdapter(): IServicelocator {
    let adapter: IServicelocator;

    switch (process.env.ADAPTERSOURCE) {
      case "hasura":
        adapter = this.hasuraProvider;
        break;
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
