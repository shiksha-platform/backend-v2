import { Expose } from "class-transformer";

export class SegmentDto {
  @Expose()
  id: string;

  @Expose()
  phoneNo: Number;

  @Expose()
  name: string;

  @Expose()
  parentName: string;

  @Expose()
  attendanceDate: string;

  @Expose()
  month: string;

  @Expose()
  teacherName: string;

  @Expose()
  schoolName: string;

  @Expose()
  startDate: string;

  @Expose()
  endDate: string;

  constructor(obj: SegmentDto) {
    Object.assign(this, obj);
  }
}
