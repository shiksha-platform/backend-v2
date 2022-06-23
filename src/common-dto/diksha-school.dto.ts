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
    // this.status = obj?.is_enabled;
    // this.fatherFirstName = obj?.fatherName;
    // this.fatherPhoneNumber = obj?.fatherName;
    // this.motherFirstName = obj?.motherName;
    // this.meta = obj.subject;
    //   obj.previous_gra,
    //   obj.previous_gra,
    //   obj.previous_acad_yea,
    //   obj.subject,
    //   obj.section,
    //   obj.grade_number,
    //   obj.streamTag,
    //   obj.grade_year_mapping;
  }
}
