import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

export class StudentDetailDto {
  @Expose()
  studentId: string;

  @Expose()
  refId: string;

  @Expose()
  aadhaar: Number;

  @Expose()
  firstName: string;

  lastName: string;

  @Expose()
  schoolId: string;

  @Expose()
  currentClassId: string;

  @Expose()
  gender: string;

  @Expose()
  socialCategory: string;

  @Expose()
  iscwsn: string;

  @Expose()
  religion: string;

  @Expose()
  singleGirl: string;

  @Expose()
  weight: string;

  @Expose()
  height: string;

  @Expose()
  bloodGroup: string;

  @Expose()
  birthDate: string;

  @Expose()
  homeless: string;

  @Expose()
  bpl: string;

  @Expose()
  migrant: string;

  @Expose()
  status: string;

  @Expose()
  email: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdBy: string;

  @Expose()
  updatedBy: string;

  constructor(obj: StudentDetailDto) {
    Object.assign(this, obj);
  }
}
