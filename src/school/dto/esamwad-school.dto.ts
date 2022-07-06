import { Expose } from "class-transformer";

export class EsamwadSchoolDto {
  @Expose()
  schoolId: string;
  @Expose()
  schoolName: string;
  @Expose()
  udise: string;
  @Expose()
  schoolType: string;
  @Expose()
  classes: [];
  @Expose()
  meta: [];
  @Expose()
  location: string;

  constructor(obj: any) {
    this.schoolId = obj?.id ? `${obj.id}` : "";
    this.schoolName = obj?.schoolName ? obj.schoolName : "";
    this.udise = obj?.udise ? `${obj.udise}` : "";
    this.schoolType = obj?.type ? `${obj.type}` : "";
    this.classes = obj?.classes;
    this.meta = obj?.session;
    this.location = obj?.location;
  }
}
