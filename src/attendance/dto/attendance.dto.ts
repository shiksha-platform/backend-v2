import { Exclude, Expose } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AttendanceDto {
  @Expose()
  attendanceId: string;

  @ApiProperty({
    type: String,
    description: "The id of the attendance ",
    default: "",
  })
  @Expose()
  @ApiPropertyOptional()
  schoolId: string;

  @ApiPropertyOptional({
    type: String,
    description: "The userType of the attendance",
    default: "",
  })
  @Expose()
  userType: string;

  @ApiProperty({
    type: String,
    description: "The userid of the attendance",
    default: "",
  })
  @Expose()
  userId: string;

  @ApiPropertyOptional({
    type: String,
    description: "The groupid of the attendance",
    default: "",
  })
  @Expose()
  groupId: string;

  @ApiProperty({
    type: String,
    description: "The topicid of the attendance",
    default: "",
  })
  @Expose()
  @ApiPropertyOptional()
  topicId: string;

  @ApiProperty({
    type: String,
    description: "The eventid of the attendance",
    default: "",
  })
  @Expose()
  @ApiPropertyOptional()
  eventId: string;

  @ApiProperty({
    type: String,
    description: "The date of the attendance",
    default: new Date(),
  })
  @Expose()
  attendanceDate: string;

  @ApiProperty({
    type: String,
    description: "The attendance of the attendance",
    default: "",
  })
  @Expose()
  attendance: string;

  @ApiProperty({
    type: String,
    description: "The remark of the attendance",
    default: "",
  })
  @Expose()
  @ApiPropertyOptional()
  remark: string;

  @ApiProperty({
    type: String,
    description: "The latitude of the attendance",
    default: 0,
  })
  @Expose()
  @ApiPropertyOptional()
  latitude: Number;

  @ApiProperty({
    type: String,
    description: "The longitude of the attendance",
    default: 0,
  })
  @Expose()
  @ApiPropertyOptional()
  longitude: Number;

  @ApiProperty({
    type: "string",
    format: "binary",
    description: "The image of person",
    default: "",
  })
  @Expose()
  @ApiPropertyOptional()
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

  @ApiPropertyOptional()
  @Expose()
  syncTime: string;

  constructor(obj: any) {
    this.attendanceId = obj?.osid ? `${obj.osid}` : "";
    this.schoolId = obj?.schoolId ? `${obj.schoolId}` : "";
    this.userType = obj?.userType ? `${obj.userType}` : "";
    this.userId = obj?.userId ? `${obj.userId}` : "";
    this.groupId = obj?.groupId ? `${obj.groupId}` : "";
    this.topicId = obj?.topicId ? `${obj.topicId}` : "";
    this.eventId = obj?.eventId ? `${obj.eventId}` : "";
    this.remark = obj?.remark ? `${obj.remark}` : "";
    this.attendance = obj?.attendance ? `${obj.attendance}` : "";
    this.attendanceDate = obj?.attendanceDate ? `${obj.attendanceDate}` : "";
    this.latitude = obj?.latitude ? obj.latitude : 0;
    this.longitude = obj?.longitude ? obj.longitude : 0;
    this.image = obj?.image ? `${obj.image}` : "";
    this.syncTime = obj?.syncTime ? `${obj.syncTime}` : "";
    this.metaData = obj?.metaData ? obj.metaData : [];
    this.createdAt = obj?.osCreatedAt ? `${obj.osCreatedAt}` : "";
    this.updatedAt = obj?.osUpdatedAt ? `${obj.osUpdatedAt}` : "";
    this.createdBy = obj?.osCreatedBy ? `${obj.osCreatedBy}` : "";
    this.updatedBy = obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "";
  }
}
