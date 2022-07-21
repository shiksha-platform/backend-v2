import { Expose } from "class-transformer";

export class TeacherSegementDto {
  @Expose()
  firstName: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  fcmToken: string;

  constructor(obj: any) {
    this.firstName = obj?.firstName ? `${obj.firstName}` : "";

    this.phoneNumber = obj?.phoneNumber ? `${obj.phoneNumber}` : "";

    this.fcmToken = obj?.fcmToken ? `${obj.fcmToken}` : "";
  }
}
