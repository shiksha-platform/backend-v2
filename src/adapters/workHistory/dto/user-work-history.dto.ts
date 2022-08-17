import { Expose } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class UserWorkHistoryDto {
  @Expose()
  workHistoryId: string;

  @ApiProperty({
    type: String,
    description: "ID of the user for which posting info is stored",
  })
  @Expose()
  userId: string;

  @ApiProperty({
    type: String,
    description: "role of the user ",
  })
  @Expose()
  role: string;

  @ApiProperty({
    type: String,
    description: "Designation of the user at time of joining that posting",
  })
  @Expose()
  joiningDesignation: string;

  @ApiProperty({
    type: String,
    description: "Designation of the user while leaving that posting",
  })
  @Expose()
  leavingDesignation: string;

  @ApiProperty({
    type: String,
    description: "Date of joining in that posting",
    default: new Date().toISOString().split("T")[0],
  })
  @Expose()
  dateOfJoining: Date;

  @ApiProperty({
    type: String,
    description: "Date of relieving from that posting",
    default: new Date().toISOString().split("T")[0],
  })
  @Expose()
  dateOfRelieving: Date;

  @ApiProperty({
    type: String,
    description: "Reason of closure of that posting",
  })
  @Expose()
  reason: string;

  @ApiProperty({
    type: String,
    description: "any remark",
  })
  @Expose()
  remark: string;

  @ApiProperty({})
  @Expose()
  cadre: string;

  @ApiProperty({})
  @Expose()
  transferOrderNumber: string;

  @ApiProperty({})
  @Expose()
  placeOfPosting: string;

  @ApiProperty({
    default: new Date().toISOString().split("T")[0],
  })
  @Expose()
  dateOfOrder: string;

  @ApiProperty({})
  @Expose()
  modeOfPosting: string;

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

  @Expose()
  workHistory: string;

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

  constructor(obj: any) {
    this.workHistoryId = obj?.workHistoryId ? `${obj.workHistoryId}` : "";
    this.userId = obj?.userId ? `${obj.userId}` : "";
    this.role = obj?.role ? `${obj.role}` : "";
    this.joiningDesignation = obj?.joiningDesignation
      ? `${obj.joiningDesignation}`
      : "";
    this.leavingDesignation = obj?.leavingDesignation
      ? `${obj.leavingDesignation}`
      : "";
    this.dateOfJoining = obj?.dateOfJoining ? obj.dateOfJoining : "";
    this.dateOfRelieving = obj?.dateOfRelieving ? obj.dateOfRelieving : "";
    this.reason = obj?.reason ? `${obj.reason}` : "";
    this.remark = obj?.remark ? `${obj.remark}` : "";
    this.cadre = obj?.cadre ? `${obj.cadre}` : "";
    this.transferOrderNumber = obj?.transferOrderNumber
      ? `${obj.transferOrderNumber}`
      : "";
    this.placeOfPosting = obj?.placeOfPosting ? `${obj.placeOfPosting}` : "";
    this.dateOfOrder = obj?.dateOfOrder ? obj.dateOfOrder : "";
    this.modeOfPosting = obj?.modeOfPosting ? `${obj.modeOfPosting}` : "";
    this.createdAt = obj?.created_at ? `${obj.created_at}` : "";
    this.updatedAt = obj?.updated_at ? `${obj.updated_at}` : "";
  }
}
