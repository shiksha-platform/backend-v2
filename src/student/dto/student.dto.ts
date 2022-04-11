import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

export class StudentDto {
  @ApiProperty()
  @Expose()
  studentId: string;

  @ApiProperty()
  @Expose()
  refId: string;

  @ApiPropertyOptional()
  @Expose()
  aadhaar: string;

  @ApiProperty()
  @Expose()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  @Expose()
  schoolId: string;

  @ApiProperty()
  @Expose()
  currentClassId: string;

  @ApiProperty()
  @Expose()
  gender: string;

  @ApiPropertyOptional()
  @Expose()
  socialCategory: string;

  @ApiPropertyOptional()
  @Expose()
  iscwsn: string;

  @ApiPropertyOptional()
  @Expose()
  religion: string;

  @ApiPropertyOptional()
  @Expose()
  singleGirl: string;

  @ApiPropertyOptional()
  @Expose()
  weight: string;

  @ApiPropertyOptional()
  @Expose()
  height: string;

  @ApiPropertyOptional()
  @Expose()
  bloodGroup: string;

  @ApiProperty()
  @Expose()
  birthDate: string;

  @ApiPropertyOptional()
  @Expose()
  homeless: string;

  @ApiProperty()
  @Expose()
  bpl: string;

  @ApiProperty()
  @Expose()
  migrant: string;

  @ApiProperty()
  @Expose()
  status: string;

  @ApiPropertyOptional()
  @Expose()
  email: string;

  @ApiPropertyOptional()
  @Expose()
  fullName: string;

  @ApiPropertyOptional()
  @Expose()
  fatherName: string;

  @ApiPropertyOptional()
  @Expose()
  phoneNumber: string;

  @ApiPropertyOptional()
  @Expose()
  admissionNo: string;

  @ApiPropertyOptional()
  @Expose()
  address: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdBy: string;

  @Expose()
  updatedBy: string;

  constructor(obj: StudentDto) {
    Object.assign(this, obj);
  }
}
