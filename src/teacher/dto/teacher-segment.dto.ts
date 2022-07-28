import { Expose } from "class-transformer";

export class TeacherSegementDto {
  @Expose()
  fcmToken: string;

  @Expose()
  phoneNo: string;

  @Expose()
  name: string;

  constructor(obj: any) {
    this.fcmToken = obj?.fcmToken ? `${obj.fcmToken}` : "";
    this.phoneNo = obj?.phoneNumber ? `${obj.phoneNumber}` : "";
    this.name = obj?.firstName ? `${obj.firstName}` : "";
  }
}
