import { Exclude, Expose } from "class-transformer";
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
} from "class-validator";

export class SaveStudentDto {
  @MaxLength(16)
  @Expose()
  aadhaar: string;

  @Expose()
  refStudentId: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @IsNumber()
  contactNumber: string;

  @IsEmail()
  email: string;

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
  schoolId: string;

  @Expose()
  currentClassId: string;

  @Expose()
  status: string;

  @Expose()
  image: string;

  @Expose()
  studentId: string;

  constructor(obj: SaveStudentDto) {
    Object.keys(obj).forEach((key) => (obj[key] === "" ? delete obj[key] : {}));
    Object.assign(this, obj);
  }
}
