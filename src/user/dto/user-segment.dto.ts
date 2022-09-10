import { Expose } from "class-transformer";

export class UserSegmentDto {
  @Expose()
  fcmToken: string;

  @Expose()
  phoneNo: string;

  @Expose()
  name: string;

  @Expose()
  fcmClickActionUrl: string;

  constructor(obj: any) {
    Object.assign(this, obj);
  }
}
