import { Expose } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsIn, IsNotEmpty, IsString } from "class-validator";
import { VisitStatus } from "./visitStatus.enum";

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
  schoolId: string;

  @ApiProperty({
    default: new Date().toISOString().split("T")[0],
  })
  @Expose()
  scheduleVisitDate: string;

  @ApiProperty({
    default: new Date().toISOString().split("T")[0],
  })
  @Expose()
  visitDate: string;

  @ApiProperty({})
  @Expose()
  feedback: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([VisitStatus.pending, VisitStatus.visited])
  @IsEnum(VisitStatus)
  @ApiPropertyOptional({
    enum: [VisitStatus.pending, VisitStatus.visited],
  })
  @Expose()
  status: string;

  @ApiProperty({ default: new Date().toISOString().split("T")[0] })
  @Expose()
  lastVisited: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdBy: string;

  @Expose()
  updatedBy: string;

  constructor(obj: any) {
    Object.assign(this, obj);
  }
}
