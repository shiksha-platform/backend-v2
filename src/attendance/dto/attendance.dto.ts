import { Exclude, Expose } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsIn, IsNotEmpty, IsString } from "class-validator";
import {
  attendance,
  remark,
  subjectList,
  userType,
} from "../enums/attendance.enums";

export class AttendanceDto {
  @Expose()
  attendanceId: string;

  @ApiProperty({
    type: String,
    description: "The schoolId of the attendance ",
    default: "",
  })
  @Expose()
  @ApiPropertyOptional()
  schoolId: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([userType.student, userType.teacher, userType.mentor, userType.monitor])
  @IsEnum(userType)
  @ApiPropertyOptional({
    type: String,
    description: "The userType of the attendance",
    default: "",
    enum: [
      userType.student,
      userType.teacher,
      userType.mentor,
      userType.monitor,
    ],
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

  @IsString()
  @IsNotEmpty()
  @IsIn([
    subjectList.hindi,
    subjectList.english,
    subjectList.bengali,
    subjectList.marathi,
    subjectList.science,
    subjectList.sanskrit,
    subjectList.geography,
    subjectList.spanish,
    subjectList.tamil,
    subjectList.telugu,
    subjectList.kannada,
    subjectList.arabicbidaytularebia,
    subjectList.balbharatikannada,
    subjectList.cocurricular,
    subjectList.evs,
    subjectList.evspart1,
    subjectList.evspart2,
    subjectList.gujarati,
    subjectList.defencestudies,
    subjectList.gulhaafarsi,
    subjectList.history,
    subjectList.historyandcivics,
    subjectList.historyandpoliticalscience,
    subjectList.khelekaresikhe,
    subjectList.khelokarusikhu,
    subjectList.khelukarushiku,
    subjectList.kumarbharatikannada,
    subjectList.marathishikshaksanhita,
    subjectList.mathematics,
    subjectList.playdolearn,
    subjectList.scholarshipenglish,
    subjectList.scholarshipintelligencetest,
    subjectList.scholarshipmarathi,
    subjectList.scholarshipmathematics,
    subjectList.secretarialpracticesp,
    subjectList.selfdevelopment,
    subjectList.urdu,
  ])
  @IsEnum(subjectList)
  @ApiProperty({
    type: String,
    description: "The topicid of the attendance",
    default: "",
    enum: [
      subjectList.hindi,
      subjectList.english,
      subjectList.bengali,
      subjectList.marathi,
      subjectList.science,
      subjectList.sanskrit,
      subjectList.geography,
      subjectList.spanish,
      subjectList.tamil,
      subjectList.telugu,
      subjectList.kannada,
      subjectList.arabicbidaytularebia,
      subjectList.balbharatikannada,
      subjectList.cocurricular,
      subjectList.evs,
      subjectList.evspart1,
      subjectList.evspart2,
      subjectList.gujarati,
      subjectList.defencestudies,
      subjectList.gulhaafarsi,
      subjectList.history,
      subjectList.historyandcivics,
      subjectList.historyandpoliticalscience,
      subjectList.khelekaresikhe,
      subjectList.khelokarusikhu,
      subjectList.khelukarushiku,
      subjectList.kumarbharatikannada,
      subjectList.marathishikshaksanhita,
      subjectList.mathematics,
      subjectList.playdolearn,
      subjectList.scholarshipenglish,
      subjectList.scholarshipintelligencetest,
      subjectList.scholarshipmarathi,
      subjectList.scholarshipmathematics,
      subjectList.secretarialpracticesp,
      subjectList.selfdevelopment,
      subjectList.urdu,
    ],
  })
  @ApiPropertyOptional()
  @Expose()
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

  @IsString()
  @IsNotEmpty()
  @IsIn([
    attendance.present,
    attendance.absent,
    attendance.unmarked,
    attendance.specialDuty,
    attendance.onleave,
  ])
  @IsEnum(attendance)
  @ApiPropertyOptional({
    type: String,
    description: "The attendance of the attendance",
    default: "",
    enum: [
      attendance.present,
      attendance.absent,
      attendance.unmarked,
      attendance.specialDuty,
      attendance.onleave,
    ],
  })
  @Expose()
  attendance: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([
    remark.present,
    remark.absent,
    remark.unmarked,
    remark.specialDuty,
    remark.onleave,
  ])
  @IsEnum(remark)
  @ApiPropertyOptional({
    type: String,
    description: "The remark of the attendance",
    default: "",
    enum: [
      remark.present,
      remark.absent,
      remark.unmarked,
      remark.specialDuty,
      remark.onleave,
    ],
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

  @ApiPropertyOptional()
  @Expose()
  syncTime: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  constructor(obj: any) {
    this.attendanceId = obj?.attendanceId ? `${obj.attendanceId}` : "";
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
    this.createdAt = obj?.created_at ? `${obj.created_at}` : "";
    this.updatedAt = obj?.updated_at ? `${obj.updated_at}` : "";
  }
}
