import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

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
    this.monitorTrackingId = obj?.monitorTrackingId
      ? `${obj.monitorTrackingId}`
      : "";
    this.monitorId = obj?.monitorId ? `${obj.monitorId}` : "";
    this.schoolId = obj?.schoolId ? `${obj.schoolId}` : "";
    this.groupId = obj?.groupId ? `${obj.groupId}` : "";
    this.scheduleVisitDate = obj?.scheduleVisitDate
      ? `${obj.scheduleVisitDate}`
      : "";
    this.visitDate = obj?.visitDate ? `${obj.visitDate}` : "";
    this.feedback = obj?.feedback ? `${obj.feedback}` : "";
    this.status = obj?.status ? `${obj.status}` : "";
    this.createdAt = obj?.created_at ? `${obj.created_at}` : "";
    this.updatedAt = obj?.updated_at ? `${obj.updated_at}` : "";
  }
}
