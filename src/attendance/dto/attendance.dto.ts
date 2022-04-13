import { Exclude, Expose } from "class-transformer";
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AttendanceDto {
  @Exclude()
  attendanceId: string;

  @ApiProperty({
    type: String,
    description: "The id of the attendance ",
    default: "",
  })
  @Expose()
  @ApiPropertyOptional()
  schoolId: string;

  @ApiProperty({
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

  @ApiProperty({
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

  constructor(partial: AttendanceDto) {
    Object.assign(this, partial);
    this.attendanceId = `${this.attendanceId}`;
    this.schoolId = `${this.schoolId}`;
    this.userId = `${this.userId}`;
    this.groupId = `${this.groupId}`;
    this.topicId = `${this.topicId}`;
    this.eventId = `${this.eventId}`;
    this.remark = `${this.remark}`;
    this.attendance = `${this.attendance}`;
    this.attendanceDate = `${this.attendanceDate}`;
    this.latitude = this.latitude;
    this.longitude = this.longitude;
    this.image = `${this.image}`;
    this.syncTime = `${this.syncTime}`;
  }
}
