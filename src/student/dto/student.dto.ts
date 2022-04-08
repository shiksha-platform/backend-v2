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
  aadhaar: Number;

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
  singleGirl: boolean;

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
  homeless: boolean;

  @ApiProperty()
  @Expose()
  bpl: boolean;

  @ApiProperty()
  @Expose()
  migrant: boolean;

  @ApiProperty()
  @Expose()
  status: string;

  @ApiPropertyOptional()
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
  constructor(obj: StudentDto) {
    Object.assign(this, obj);
  }
}
