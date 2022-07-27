import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class MentorTrackingDto {
  @Expose()
  mentorTrackingId: string;

  @ApiProperty({})
  @Expose()
  mentorId: string;

  @ApiProperty({})
  @Expose()
  teacherId: string;

  @ApiProperty({})
  @Expose()
  scheduleVisitDate: string;

  @ApiProperty({})
  @Expose()
  visitDate: string;

  @ApiProperty({})
  @Expose()
  feedback: string;

  @ApiProperty({})
  @Expose()
  status: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdBy: string;

  @Expose()
  updatedBy: string;

  constructor(obj: any) {
    this.mentorTrackingId = obj?.mentorTrackingId
      ? `${obj.mentorTrackingId}`
      : "";
    this.mentorId = obj?.mentorId ? `${obj.mentorId}` : "";
    this.teacherId = obj?.teacherId ? `${obj.teacherId}` : "";
    this.scheduleVisitDate = obj?.scheduleVisitDate
      ? `${obj.scheduleVisitDate}`
      : "";
    this.visitDate = obj?.visitDate ? `${obj.visitDate}` : "";
    this.feedback = obj?.feedback ? `${obj.feedback}` : "";
    this.status = obj?.status ? `${obj.status}` : "";
    this.createdAt = obj?.createdAt ? `${obj.createdAt}` : "";
    this.updatedAt = obj?.updatedAt ? `${obj.updatedAt}` : "";
    this.createdBy = obj?.createdBy ? `${obj.createdBy}` : "";
    this.updatedBy = obj?.updatedBy ? `${obj.updatedBy}` : "";
  }
}
