import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AttendanceSearchDto {
  @ApiProperty({
    type: String,
    description: "Limit",
  })
  limit: string;

  @ApiProperty({
    type: Number,
    description: "number",
  })
  page: number;

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
