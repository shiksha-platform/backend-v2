import { Exclude, Expose } from "class-transformer";
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class EsamwadUserDto {
  @Expose()
  userId: string;

  @ApiProperty({
    type: String,
    description: "The firstname of the user",
  })
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
  @IsNumber()
  phoneNumber: Number;

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
  pincode: Number;

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
  @ApiProperty({
    type: String,
    description: "roleId of user, teacher, mentor,monitor",
  })
  @Expose()
  role: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdBy: string;

  @Expose()
  updatedBy: string;

  constructor(obj: any) {
    this.userId = obj?.userId ? `${obj.userId}` : "";
    this.refId1 = obj?.refId1 ? `${obj.refId1}` : "";
    this.refId2 = obj?.refId2 ? `${obj.refId2}` : "";
    this.refId3 = obj?.refId3 ? `${obj.refId3}` : "";

    this.firstName = obj?.firstName ? `${obj.firstName}` : "";
    this.middleName = obj?.middleName ? `${obj.middleName}` : "";
    this.lastName = obj?.lastName ? `${obj.lastName}` : "";
    this.phoneNumber = obj?.phoneNumber ? obj.phoneNumber : "";
    this.email = obj?.email ? `${obj.email}` : "";
    this.aadhaar = obj?.aadhaar ? `${obj.aadhaar}` : "";
    this.gender = obj?.gender ? `${obj.gender}` : "";
    this.socialCategory = obj?.socialCategory ? `${obj.socialCategory}` : "";
    this.birthDate = obj?.birthDate ? `${obj.birthDate}` : "";
    this.designation = obj?.designation ? `${obj.designation}` : "";
    this.cadre = obj?.cadre ? `${obj.cadre}` : "";
    this.profQualification = obj?.profQualification
      ? `${obj.profQualification}`
      : "";
    this.joiningDate = obj?.joiningDate ? `${obj.joiningDate}` : "";
    this.subjectIds = obj.subjectIds ? obj.subjectIds : [];
    this.bloodGroup = obj?.bloodGroup ? `${obj.bloodGroup}` : "";
    this.maritalStatus = obj?.maritalStatus ? `${obj.maritalStatus}` : "";
    this.compSkills = obj?.compSkills ? `${obj.compSkills}` : "";
    this.disability = obj?.disability ? `${obj.disability}` : "";
    this.religion = obj?.religion ? `${obj.religion}` : "";
    this.homeDistance = obj?.homeDistance ? `${obj.homeDistance}` : "";
    this.employmentType = obj?.employmentType ? `${obj.employmentType}` : "";
    this.schoolId = obj?.schoolId ? `${obj.schoolId}` : "";
    this.address = obj?.address ? `${obj.address}` : "";
    this.village = obj?.village ? `${obj.village}` : "";
    this.block = obj?.block ? `${obj.block}` : "";
    this.district = obj?.district ? `${obj.district}` : "";
    this.stateId = obj?.stateId ? `${obj.stateId}` : "";
    this.pincode = obj?.pincode ? obj.pincode : "";
    this.locationId = obj?.locationId ? `${obj.locationId}` : "";
    this.image = obj?.image ? `${obj.image}` : "";
    this.status = obj?.status ? `${obj.status}` : "";
    this.deactivationReason = obj?.deactivationReason
      ? `${obj.deactivationReason}`
      : "";
    this.reportsTo = obj?.reportsTo ? `${obj.reportsTo}` : "";
    this.role = obj?.role ? `${obj.role}` : "";
    this.retirementDate = obj?.retirementDate ? `${obj.retirementDate}` : "";
    this.workingStatus = obj?.workingStatus ? `${obj.workingStatus}` : "";
    this.metaData = obj?.metaData ? obj.metaData : [];
    this.createdAt = obj?.osCreatedAt ? `${obj.osCreatedAt}` : "";
    this.updatedAt = obj?.osUpdatedAt ? `${obj.osUpdatedAt}` : "";
    this.createdBy = obj?.osCreatedBy ? `${obj.osCreatedBy}` : "";
    this.updatedBy = obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "";
  }
}
