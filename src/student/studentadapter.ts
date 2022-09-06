import { Injectable } from "@nestjs/common";
import { EsamwadStudentService } from "src/adapters/esamwad/student.adapter";
import { IServicelocator } from "src/adapters/studentservicelocator";
import { StudentService } from "src/adapters/sunbirdrc/student.adapter";

@Injectable()
export class StudentAdapter {
  constructor(
    private eSamwadProvider: EsamwadStudentService,
    private sunbirdProvider: StudentService
  ) {}
  buildStudentAdapter(): IServicelocator {
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
