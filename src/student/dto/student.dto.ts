import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

export class StudentDto {
  @ApiProperty()
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
  lastName: string;

  @ApiProperty()
  @Expose()
  schoolId: string;

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

  @ApiPropertyOptional()
  @Expose()
  homeless: Boolean;

  @ApiProperty()
  @Expose()
  bpl: Boolean;

  @ApiProperty()
  @Expose()
  migrant: Boolean;

  @ApiProperty()
  @Expose()
  status: string;

  @ApiPropertyOptional()
  @Expose()
  email: string;

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
  motherFirstName: string;

  @ApiPropertyOptional()
  @Expose()
  motherMiddleName: string;

  @ApiPropertyOptional()
  @Expose()
  motherLastName: string;

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
  fatherPhoneNumber: Number;

  @ApiPropertyOptional()
  @Expose()
  motherPhoneNumber: Number;

  @ApiPropertyOptional()
  @Expose()
  guardianPhoneNumber: Number;

  @ApiPropertyOptional({
    type: "string",
    format: "binary",
  })
  @Expose()
  image: string;

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
    this.studentId = obj?.osid ? `${obj.osid}` : "";
    this.refId1 = obj?.refId1 ? `${obj.refId1}` : "";
    this.refId2 = obj?.refId2 ? `${obj.refId2}` : "";
    this.aadhaar = obj?.aadhaar ? `${obj.aadhaar}` : "";
    this.firstName = obj?.firstName ? `${obj.firstName}` : "";
    this.lastName = obj?.lastName ? `${obj.lastName}` : "";
    this.schoolId = obj?.schoolId ? `${obj.schoolId}` : "";
    this.iscwsn = obj?.iscwsn ? `${obj.iscwsn}` : "";
    this.gender = obj?.gender ? `${obj.gender}` : "";
    this.socialCategory = obj?.socialCategory ? `${obj.socialCategory}` : "";
    this.religion = obj?.religion ? `${obj.religion}` : "";
    this.singleGirl = obj?.singleGirl ? obj.singleGirl : "";
    this.weight = obj?.weight ? `${obj.weight}` : "";
    this.height = obj?.height ? `${obj.height}` : "";
    this.bloodGroup = obj?.bloodGroup ? `${obj.bloodGroup}` : "";
    this.birthDate = obj?.birthDate ? `${obj.birthDate}` : "";
    this.homeless = obj?.homeless ? obj.homeless : "";
    this.bpl = obj?.bpl ? obj.bpl : "";
    this.migrant = obj?.migrant ? obj.migrant : "";
    this.status = obj?.status ? `${obj.status}` : "";
    this.email = obj?.email ? `${obj.email}` : "";
    this.fatherFirstName = obj?.fatherFirstName ? `${obj.fatherFirstName}` : "";
    this.motherFirstName = obj?.motherFirstName ? `${obj.motherFirstName}` : "";
    this.guardianFirstName = obj?.guardianFirstName
      ? `${obj.guardianFirstName}`
      : "";
    this.fatherMiddleName = obj?.fatherMiddleName
      ? `${obj.fatherMiddleName}`
      : "";
    this.motherMiddleName = obj?.motherMiddleName
      ? `${obj.motherMiddleName}`
      : "";
    this.guardianMiddleName = obj?.guardianMiddleName
      ? `${obj.guardianMiddleName}`
      : "";
    this.fatherLastName = obj?.fatherLastName ? `${obj.fatherLastName}` : "";
    this.motherLastName = obj?.motherLastName ? `${obj.motherLastName}` : "";
    this.guardianLastName = obj?.guardianLastName
      ? `${obj.guardianLastName}`
      : "";
    this.fatherPhoneNumber = obj?.fatherPhoneNumber
      ? obj.fatherPhoneNumber
      : "";
    this.motherPhoneNumber = obj?.motherPhoneNumber
      ? obj.motherPhoneNumber
      : "";
    this.guardianPhoneNumber = obj?.guardianPhoneNumber
      ? obj.guardianPhoneNumber
      : "";
    this.image = obj?.image ? `${obj.image}` : "";
    this.createdAt = obj?.osCreatedAt ? `${obj.osCreatedAt}` : "";
    this.updatedAt = obj?.osUpdatedAt ? `${obj.osUpdatedAt}` : "";
    this.createdBy = obj?.osCreatedBy ? `${obj.osCreatedBy}` : "";
    this.updatedBy = obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "";
  }
}
