import { Exclude, Expose } from "class-transformer";
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TeacherDto {
  @Expose()
  teacherId: string;

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
    description: "The first name of the teacher",
  })
  @Expose()
  firstName: string;

  @ApiProperty({
    type: String,
    description: "The middle name of the teacher",
  })
  @Expose()
  middleName: string;

  @ApiProperty({
    type: String,
    description: "The lastname of the teacher",
  })
  @Expose()
  lastName: string;

  @ApiProperty({
    type: String,
    description: "The contact number of the teacher",
  })
  @Expose()
  phoneNumber: string;

  @ApiProperty({
    type: String,
    description: "The email of the teacher",
  })
  @Expose()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Expose()
  aadhaar: string;

  @ApiProperty({
    type: String,
    description: "The gender of the teacher",
  })
  @Expose()
  gender: string;

  @ApiProperty({
    type: String,
    description: "The socialCategory of the teacher",
  })
  @Expose()
  socialCategory: string;

  @ApiProperty({
    type: String,
    description: "The birthDate of the teacher",
  })
  @Expose()
  birthDate: string;

  @ApiProperty({
    type: String,
    description: "The designation of the teacher",
  })
  @Expose()
  designation: string;

  @ApiProperty({
    type: String,
    description: "The cadre of the teacher",
  })
  @Expose()
  cadre: string;

  @ApiProperty({
    type: String,
    description: "The profQualification of the teacher",
  })
  @Expose()
  profQualification: string;

  @ApiProperty({
    type: String,
    description: "The joiningDate of the teacher",
  })
  @Expose()
  joiningDate: string;

  @ApiProperty({
    type: [String],
    description: "The subjectId of the teacher",
  })
  @Expose()
  subjectIds: [string];

  @ApiProperty({
    type: String,
    description: "The bloodGroup of the teacher",
  })
  @Expose()
  bloodGroup: string;

  @ApiProperty({
    type: String,
    description: "The maritalStatus of the teacher",
  })
  @Expose()
  maritalStatus: string;

  @ApiProperty({
    type: String,
    description: "The compSkills of the teacher",
  })
  @Expose()
  compSkills: string;

  @ApiProperty({
    type: String,
    description: "The disability of the teacher",
  })
  @Expose()
  disability: string;

  @ApiProperty({
    type: String,
    description: "The religion of the teacher",
  })
  @Expose()
  religion: string;

  @ApiProperty({
    type: String,
    description: "The homeDistance of the teacher",
  })
  @Expose()
  homeDistance: string;

  @ApiProperty({
    type: String,
    description: "The schoolId of the teacher",
  })
  @Expose()
  schoolId: string;

  @ApiPropertyOptional()
  @Expose()
  teacherAddress: string;

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
    description: "The retirementDate of the teacher",
  })
  @Expose()
  retirementDate: string;

  @ApiProperty({
    type: String,
    description: "The workingStatus of the teacher",
  })
  @Expose()
  workingStatus: string;

  @ApiProperty({
    type: String,
    description: "The image of the teacher",
  })
  @Expose()
  image: string;

  @ApiProperty({
    type: String,
    description: "The employmentType of the teacher",
  })
  @Expose()
  employmentType: string;

  @ApiProperty({
    type: String,
    description: "The status of the teacher",
  })
  @Expose()
  status: string;

  @ApiProperty({
    type: String,
    description: "The deactivation reason of the teacher",
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

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdBy: string;

  @Expose()
  updatedBy: string;

  constructor(obj: any) {
    this.teacherId = obj?.osid ? `${obj.osid}` : "";
    this.refId1 = obj?.refId1 ? `${obj.refId1}` : "";
    this.refId2 = obj?.refId2 ? `${obj.refId2}` : "";
    this.refId3 = obj?.refId3 ? `${obj.refId3}` : "";

    this.firstName = obj?.firstName ? `${obj.firstName}` : "";
    this.middleName = obj?.middleName ? `${obj.middleName}` : "";
    this.lastName = obj?.lastName ? `${obj.lastName}` : "";
    this.phoneNumber = obj?.phoneNumber ? `${obj.phoneNumber}` : "";
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
    this.teacherAddress = obj?.teacherAddress ? `${obj.teacherAddress}` : "";
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
    this.retirementDate = obj?.retirementDate ? `${obj.retirementDate}` : "";
    this.workingStatus = obj?.workingStatus ? `${obj.workingStatus}` : "";
    this.fcmToken = obj?.fcmToken ? `${obj.fcmToken}` : "";
    this.metaData = obj?.metaData ? obj.metaData : [];
    this.createdAt = obj?.osCreatedAt ? `${obj.osCreatedAt}` : "";
    this.updatedAt = obj?.osUpdatedAt ? `${obj.osUpdatedAt}` : "";
    this.createdBy = obj?.osCreatedBy ? `${obj.osCreatedBy}` : "";
    this.updatedBy = obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "";
  }
}
