import { Expose } from "class-transformer";

export class EsamwadStudentDto {
  @Expose()
  studentId: string;
  @Expose()
  refId1: string;
  @Expose()
  refId: string;
  @Expose()
  firstName: string;
  @Expose()
  schoolId: string;
  @Expose()
  gender: string;
  @Expose()
  socialCategory: string;
  @Expose()
  iscwsn: string;
  @Expose()
  status: string;
  @Expose()
  fatherFirstName: string;
  @Expose()
  fatherPhoneNumber: string;
  @Expose()
  motherFirstName: string;
  @Expose()
  meta: any;

  constructor(obj: any) {
    this.studentId = obj?.id ? `${obj.id}` : "";
    this.refId = obj?.admissionNumber ? `${obj.admissionNumber}` : "";
    this.refId1 = obj?.rollNumber ? `${obj.rollNumber}` : "";
    this.firstName = obj?.name ? `${obj.name}` : "";
    this.schoolId = obj?.school;
    this.gender = obj?.gender;
    this.socialCategory = obj?.category;
    this.iscwsn = obj?.isCWSN;
    this.status = obj?.is_enabled;
    this.fatherFirstName = obj?.fatherName;
    this.fatherPhoneNumber = obj?.fatherName;
    this.motherFirstName = obj?.motherName;
    this.meta = obj.subject;
  }
}
