import { Exclude, Expose } from "class-transformer";
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

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

  @ApiProperty({
    type: String,
    description: "The gender of the user",
  })
  @Expose()
  gender: string;

  @ApiProperty({
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

  @ApiProperty({
    type: String,
    description: "The maritalStatus of the user",
  })
  @Expose()
  maritalStatus: string;

  @ApiProperty({
    type: String,
    description: "The compSkills of the user",
  })
  @Expose()
  compSkills: string;

  @ApiProperty({
    type: String,
    description: "The disability of the user",
  })
  @Expose()
  disability: string;

  @ApiProperty({
    type: String,
    description: "The religion of the user",
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

  @ApiProperty({
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

  @ApiProperty({
    type: String,
    description: "The employmentType of the user",
  })
  @Expose()
  employmentType: string;

  @ApiProperty({
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

  @ApiProperty({
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
