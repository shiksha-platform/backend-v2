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
  lastName: string;

  @ApiProperty()
  @Expose()
  schoolId: string;

  @ApiProperty()
  @Expose()
  groupId: string;

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
  fatherName: string;

  @ApiPropertyOptional()
  @Expose()
  motherName: string;

  @ApiPropertyOptional()
  @Expose()
  guardianName: string;

  @ApiPropertyOptional()
  @Expose()
  fatherPhoneNumber: string;

  @ApiPropertyOptional()
  @Expose()
  motherPhoneNumber: string;

  @ApiPropertyOptional()
  @Expose()
  guardianPhoneNumber: string;

  @ApiPropertyOptional({
    type: "string",
    format: "binary",
  })
  @Expose()
  image: string;

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
    this.groupId = obj?.groupId ? `${obj.groupId}` : "";
    this.iscwsn = obj?.iscwsn ? `${obj.iscwsn}` : "";
    this.gender = obj?.gender ? `${obj.gender}` : "";
    this.socialCategory = obj?.socialCategory ? `${obj.socialCategory}` : "";
    this.religion = obj?.religion ? `${obj.religion}` : "";
    this.singleGirl = obj?.singleGirl ? `${obj.singleGirl}` : "";
    this.weight = obj?.weight ? `${obj.weight}` : "";
    this.height = obj?.height ? `${obj.height}` : "";
    this.bloodGroup = obj?.bloodGroup ? `${obj.bloodGroup}` : "";
    this.birthDate = obj?.birthDate ? `${obj.birthDate}` : "";
    this.homeless = obj?.homeless ? `${obj.homeless}` : "";
    this.bpl = obj?.bpl ? `${obj.bpl}` : "";
    this.migrant = obj?.migrant ? `${obj.migrant}` : "";
    this.status = obj?.status ? `${obj.status}` : "";
    this.email = obj?.email ? `${obj.email}` : "";
    this.fatherName = obj?.fatherName ? `${obj.fatherName}` : "";
    this.motherName = obj?.motherName ? `${obj.motherName}` : "";
    this.guardianName = obj?.guardianName ? `${obj.guardianName}` : "";
    this.fatherPhoneNumber = obj?.fatherPhoneNumber
      ? `${obj.fatherPhoneNumber}`
      : "";
    this.motherPhoneNumber = obj?.motherPhoneNumber
      ? `${obj.motherPhoneNumber}`
      : "";
    this.guardianPhoneNumber = obj?.guardianPhoneNumber
      ? `${obj.guardianPhoneNumber}`
      : "";
    this.image = obj?.image ? `${obj.image}` : "";
    this.createdAt = obj?.osCreatedAt ? `${obj.osCreatedAt}` : "";
    this.updatedAt = obj?.osUpdatedAt ? `${obj.osUpdatedAt}` : "";
    this.createdBy = obj?.osCreatedBy ? `${obj.osCreatedBy}` : "";
    this.updatedBy = obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "";
  }
}
