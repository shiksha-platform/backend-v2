import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsEnum, IsIn, IsNotEmpty, IsString, MaxLength } from "class-validator";
import {
  enumOption,
  GenderEnumValue,
  religionEnumValue,
  socialCategory,
} from "../enums/student-value.enum";

export class StudentDto {
  @Expose()
  studentId: string;

  @ApiProperty()
  @Expose()
  refId1: string;

  @ApiProperty()
  @Expose()
  refId2: string;

  @ApiPropertyOptional()
  @Expose()
  aadhaar: string;

  @ApiProperty()
  @Expose()
  firstName: string;

  @ApiProperty()
  @Expose()
  middleName: string;

  @ApiProperty()
  @Expose()
  lastName: string;

  @ApiProperty()
  @Expose()
  schoolId: string;

  @ApiProperty()
  @Expose()
  studentPhoneNumber: Number;

  @ApiPropertyOptional()
  @Expose()
  studentEmail: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([GenderEnumValue.male, GenderEnumValue.female])
  @IsEnum(GenderEnumValue)
  @ApiProperty({
    enum: [GenderEnumValue.male, GenderEnumValue.female],
  })
  @Expose()
  gender: string;

  @ApiProperty()
  @Expose()
  groupId: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([socialCategory.general, socialCategory.obc, socialCategory.st])
  @IsEnum(socialCategory)
  @ApiPropertyOptional({
    enum: [socialCategory.general, socialCategory.obc, socialCategory.st],
  })
  @Expose()
  socialCategory: string;

  @ApiPropertyOptional()
  @Expose()
  iscwsn: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([
    religionEnumValue.hindus,
    religionEnumValue.muslims,
    religionEnumValue.christians,
    religionEnumValue.Sikhs,
    religionEnumValue.buddhists,
    religionEnumValue.jains,
  ])
  @IsEnum(religionEnumValue)
  @ApiPropertyOptional({
    enum: [
      religionEnumValue.hindus,
      religionEnumValue.muslims,
      religionEnumValue.christians,
      religionEnumValue.Sikhs,
      religionEnumValue.buddhists,
      religionEnumValue.jains,
    ],
  })
  @Expose()
  religion: string;

  @ApiPropertyOptional()
  @Expose()
  singleGirl: Boolean;

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

  @IsString()
  @IsNotEmpty()
  @IsIn([enumOption.yes, enumOption.no])
  @IsEnum(enumOption)
  @ApiPropertyOptional({
    enum: [enumOption.yes, enumOption.no],
  })
  @Expose()
  homeless: Boolean;

  @ApiProperty()
  @Expose()
  bpl: Boolean;

  @IsString()
  @IsNotEmpty()
  @IsIn([enumOption.yes, enumOption.no])
  @IsEnum(enumOption)
  @ApiPropertyOptional({
    enum: [enumOption.yes, enumOption.no],
  })
  @Expose()
  migrant: Boolean;

  @ApiProperty()
  @Expose()
  status: string;

  @ApiPropertyOptional()
  @Expose()
  fatherFirstName: string;

  @ApiPropertyOptional()
  @Expose()
  fatherMiddleName: string;

  @ApiPropertyOptional()
  @Expose()
  fatherLastName: string;

  @ApiPropertyOptional()
  @Expose()
  fatherPhoneNumber: Number;

  @ApiPropertyOptional()
  @Expose()
  fatherEmail: string;

  @ApiPropertyOptional()
  @Expose()
  motherFirstName: string;

  @ApiPropertyOptional()
  @Expose()
  motherMiddleName: string;

  @ApiPropertyOptional()
  @Expose()
  motherLastName: string;

  @ApiPropertyOptional()
  @Expose()
  motherPhoneNumber: Number;

  @ApiPropertyOptional()
  @Expose()
  motherEmail: string;

  @ApiPropertyOptional()
  @Expose()
  guardianFirstName: string;

  @ApiPropertyOptional()
  @Expose()
  guardianMiddleName: string;

  @ApiPropertyOptional()
  @Expose()
  guardianLastName: string;

  @ApiPropertyOptional()
  @Expose()
  guardianPhoneNumber: Number;

  @ApiPropertyOptional()
  @Expose()
  guardianEmail: string;

  @ApiPropertyOptional({
    type: "string",
    format: "binary",
  })
  @Expose()
  image: string;

  @ApiPropertyOptional()
  @Expose()
  studentAddress: string;

  @ApiProperty()
  @Expose()
  village: string;

  @ApiProperty()
  @Expose()
  block: string;

  @ApiProperty()
  @Expose()
  district: string;

  @ApiProperty()
  @Expose()
  stateId: string;

  @ApiProperty()
  @Expose()
  pincode: Number;

  @ApiProperty()
  @Expose()
  locationId: string;

  @ApiPropertyOptional()
  @Expose()
  deactivationReason: string;

  @ApiPropertyOptional()
  @Expose()
  metaData: [string];

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdBy: string;

  @Expose()
  updatedBy: string;

  constructor(obj: any) {
    Object.assign(this, obj);
  }
}
