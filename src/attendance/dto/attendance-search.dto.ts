import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AttendanceSearchDto {
  @ApiProperty({
    type: String,
    description: "Limit",
  })
  limit: string;

  @ApiProperty({
    type: String,
    description: "Student Id",
  })
  studentId: string;

  @ApiProperty({
    type: String,
    description: "attendanceRecordId",
  })
  attendanceRecordId: string;

  @ApiProperty({
    type: Date,
    description: "attendanceToDate",
  })
  attendanceToDate: Date;

  @ApiProperty({
    type: Date,
    description: "attendanceFromDate",
  })
  attendanceFromDate: Date;

  @ApiProperty({
    type: String,
    description: "attendance",
  })
  attendance: string;

  @ApiProperty({
    type: Object,
    description: "Filters",
  })
  @ApiPropertyOptional()
  filters: object;

  constructor(partial: Partial<AttendanceSearchDto>) {
    Object.assign(this, partial);
  }
}
