import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

export class StudentDto {
  @ApiProperty()
  studentId: string;

  @ApiProperty()
  refId: string;

  @ApiPropertyOptional()
  aadhaar: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  schoolId: string;

  @ApiProperty()
  currentClassId: string;

  @ApiProperty()
  gender: string;

  @ApiPropertyOptional()
  socialCategory: string;

  @ApiPropertyOptional()
  iscwsn: string;

  @ApiPropertyOptional()
  religion: string;

  @ApiPropertyOptional()
  singleGirl: boolean;

  @ApiPropertyOptional()
  weight: string;

  @ApiPropertyOptional()
  height: string;

  @ApiPropertyOptional()
  bloodGroup: string;

  @ApiProperty()
  birthDate: Date;

  @ApiPropertyOptional()
  homeless: boolean;

  @ApiProperty()
  bpl: boolean;

  @ApiProperty()
  migrant: boolean;

  @ApiProperty()
  status: string;

  @ApiPropertyOptional()
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
