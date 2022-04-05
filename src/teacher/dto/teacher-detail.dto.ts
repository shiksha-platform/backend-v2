import { Expose } from "class-transformer";
import { IsEmail } from "class-validator";

export class TeacherDetailDto {
  @Expose()
  teacherId: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  gender: string;

  @Expose()
  dob: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  contactNumber: string;

  @Expose()
  address: string;

  constructor(partial: TeacherDetailDto) {
    Object.assign(this, partial);
  }
}
