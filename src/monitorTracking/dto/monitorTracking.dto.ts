import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { VisitStatus } from "./visitStatus.enum";
import { IsEnum, IsIn, IsNotEmpty, IsString } from "class-validator";

export class MonitorTrackingDto {
  @Expose()
  monitorTrackingId: string;

  @ApiProperty({})
  @Expose()
  monitorId: string;

  @ApiProperty({})
  @Expose()
  schoolId: string;

  @ApiProperty({ description: "Group ID (class ID)" })
  @Expose()
  groupId: string;

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
  @ApiProperty({
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
