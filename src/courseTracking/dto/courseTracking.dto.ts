import { Exclude, Expose } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CourseTrackingDto {
  @Expose()
  courseTrackingId: string;

  @ApiProperty({})
  @Expose()
  courseId: string;

  @ApiProperty({})
  @Expose()
  userId: string;

  @ApiProperty({})
  @Expose()
  progressDetail: string;

  @ApiProperty({})
  @Expose()
  contentIds: [];

  @ApiProperty({})
  @Expose()
  startTime: string;

  @ApiProperty({})
  @Expose()
  endTime: string;

  @ApiProperty({})
  @Expose()
  certificate: string;

  @ApiProperty({})
  @Expose()
  status: string;

  @ApiProperty({})
  @Expose()
  source: string;

  @Expose()
  date: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  constructor(obj: any) {
    this.courseTrackingId = obj?.courseTrackingId
      ? `${obj.courseTrackingId}`
      : "";
    this.courseId = obj?.courseId ? `${obj.courseId}` : "";
    this.userId = obj?.userId ? `${obj.userId}` : "";
    this.progressDetail = obj?.progressDetail ? obj.progressDetail : "";
    this.contentIds = obj?.contentIds ? obj.contentIds : [];
    this.startTime = obj?.startTime ? `${obj.startTime}` : "";
    this.endTime = obj?.endTime ? `${obj.endTime}` : "";
    this.certificate = obj?.certificate ? `${obj.certificate}` : "";
    this.status = obj?.status ? `${obj.status}` : "";
    this.source = obj?.source ? `${obj.source}` : "";
    this.date = obj?.date ? `${obj.date}` : "";
    this.createdAt = obj?.created_at ? `${obj.created_at}` : "";
    this.updatedAt = obj?.updated_at ? `${obj.updated_at}` : "";
  }
}
