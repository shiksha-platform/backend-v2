import { Expose } from "class-transformer";

export class SegmentDto {
  @Expose()
  id: string;

  @Expose()
  phoneNo: Number;

  @Expose()
  name: string;

  constructor(obj: any) {
    this.id = obj?.osid ? `${obj.osid}` : "";
    this.phoneNo = obj?.guardianPhoneNumber ? obj.guardianPhoneNumber : "";
    this.name = obj?.firstName ? `${obj.firstName}` : "";
  }
}
