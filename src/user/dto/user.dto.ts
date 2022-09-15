import { Exclude, Expose } from "class-transformer";
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
  IsIn,
  IsEnum,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  employmentType,
  enumOption,
  GenderEnumValue,
  maritalStatusEnum,
  religionEnumValue,
  roleEnum,
  socialCategory,
  statusEnum,
  workingStatus,
} from "../enums/user-value.enum";

export class UserDto {
  @Expose()
  userId: string;

  @ApiProperty()
  @Expose()
  refId1: string;

  @ApiProperty()
  @Expose()
  refId2: string;

  @ApiProperty()
  @Expose()
  refId3: string;

  @ApiProperty({
    type: String,
    description: "The first name of the user",
  })
  @Expose()
  firstName: string;

  @ApiProperty({
    type: String,
    description: "The middle name of the user",
  })
  @Expose()
  middleName: string;

  @ApiProperty({
    type: String,
    description: "The lastname of the user",
  })
  @Expose()
  lastName: string;

  @ApiProperty({
    type: String,
    description: "The contact number of the user",
  })
  @Expose()
  phoneNumber: string;

  @ApiProperty({
    type: String,
    description: "The email of the user",
  })
  @Expose()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Expose()
  aadhaar: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([GenderEnumValue.male, GenderEnumValue.female])
  @IsEnum(GenderEnumValue)
  @ApiProperty({
    type: String,
    description: "The gender of the user",
    enum: [GenderEnumValue.male, GenderEnumValue.female],
  })
  @Expose()
  gender: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([socialCategory.general, socialCategory.obc, socialCategory.st])
  @IsEnum(socialCategory)
  @ApiProperty({
    enum: [socialCategory.general, socialCategory.obc, socialCategory.st],
    type: String,
    description: "The socialCategory of the user",
  })
  @Expose()
  socialCategory: string;

  @ApiProperty({
    type: String,
    description: "The birthDate of the user",
  })
  @Expose()
  birthDate: string;

  @ApiProperty({
    type: String,
    description: "The designation of the user",
  })
  @Expose()
  designation: string;

  @ApiProperty({
    type: String,
    description: "The cadre of the user",
  })
  @Expose()
  cadre: string;

  @ApiProperty({
    type: String,
    description: "The profQualification of the user",
  })
  @Expose()
  profQualification: string;

  @ApiProperty({
    type: String,
    description: "The joiningDate of the user",
  })
  @Expose()
  joiningDate: string;

  @ApiProperty({
    type: [String],
    description: "The subjectId of the user",
  })
  @Expose()
  subjectIds: [string];

  @ApiProperty({
    type: String,
    description: "The bloodGroup of the user",
  })
  @Expose()
  bloodGroup: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([maritalStatusEnum.married, maritalStatusEnum.unMarried])
  @IsEnum(maritalStatusEnum)
  @ApiProperty({
    type: String,
    description: "The maritalStatus of the user",
    enum: [GenderEnumValue.male, GenderEnumValue.female],
  })
  @Expose()
  maritalStatus: string;

  @ApiProperty({
    type: String,
    description: "The compSkills of the user",
  })
  @Expose()
  compSkills: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([enumOption.yes, enumOption.no])
  @IsEnum(GenderEnumValue)
  @ApiProperty({
    enum: [enumOption.yes, enumOption.no],
    type: String,
    description: "The disability of the user",
  })
  @Expose()
  disability: string;

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

  @ApiProperty({
    type: String,
    description: "The homeDistance of the user",
  })
  @Expose()
  homeDistance: string;

  @ApiProperty({
    type: String,
    description: "The schoolId of the user",
  })
  @Expose()
  schoolId: string;

  @ApiPropertyOptional()
  @Expose()
  address: string;

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
  pincode: string;

  @ApiProperty()
  @Expose()
  locationId: string;

  @ApiProperty({
    type: String,
    description: "The retirementDate of the user",
  })
  @Expose()
  retirementDate: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([workingStatus.working, workingStatus.retired, workingStatus.suspended])
  @IsEnum(workingStatus)
  @ApiProperty({
    enum: [
      workingStatus.working,
      workingStatus.retired,
      workingStatus.suspended,
    ],
    type: String,
    description: "The workingStatus of the user",
  })
  @Expose()
  workingStatus: string;

  @ApiProperty({
    type: String,
    description: "The image of the user",
  })
  @Expose()
  image: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([employmentType.permenant, employmentType.contractBasis])
  @IsEnum(employmentType)
  @ApiProperty({
    enum: [employmentType.permenant, employmentType.contractBasis],
    type: String,
    description: "The employmentType of the user",
  })
  @Expose()
  employmentType: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([statusEnum.publish, statusEnum.unpublish, statusEnum.draft])
  @IsEnum(statusEnum)
  @ApiProperty({
    enum: [statusEnum.publish, statusEnum.unpublish, statusEnum.draft],
    type: String,
    description: "The status of the user",
  })
  @Expose()
  status: string;

  @ApiProperty({
    type: String,
    description: "The deactivation reason of the user",
  })
  @Expose()
  deactivationReason: string;

  @ApiProperty()
  @Expose()
  reportsTo: string;

  @ApiPropertyOptional()
  @Expose()
  metaData: [string];

  @ApiPropertyOptional()
  @Expose()
  fcmToken: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([roleEnum.teacher, roleEnum.mentor, roleEnum.monitor])
  @IsEnum(roleEnum)
  @ApiProperty({
    enum: [roleEnum.teacher, roleEnum.mentor, roleEnum.monitor],
    type: String,
    description: "roleId of user, teacher, mentor,monitor",
  })
  @Expose()
  role: string;

  @ApiProperty({
    type: String,
    description: "employee code of user, teacher, mentor,monitor",
  })
  @Expose()
  employeeCode: string;

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
