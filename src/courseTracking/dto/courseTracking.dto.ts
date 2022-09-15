import { Exclude, Expose } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsIn, IsNotEmpty, IsString } from "class-validator";
import { source, status } from "../enums/courseTracking.enum";

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

  @IsString()
  @IsNotEmpty()
  @IsIn([status.complete, status.inprogress, status.pending])
  @IsEnum(status)
  @ApiProperty({
    type: String,

    default: "",
    enum: [status.complete, status.inprogress, status.pending],
  })
  @Expose()
  status: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([source.diksha, source.khanAcademy])
  @IsEnum(source)
  @ApiProperty({
    description: "source of course",
    enum: [source.diksha, source.khanAcademy],
  })
  @Expose()
  source: string;

  @Expose()
  date: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  constructor(obj: any) {
    Object.assign(this, obj);
  }
}
