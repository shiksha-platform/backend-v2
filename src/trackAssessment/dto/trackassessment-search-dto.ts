import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TrackAssessmentSearchDto {
  @ApiProperty({
    type: String,
    description: "Limit",
  })
  limit: string;

  @ApiProperty({
    type: Object,
    description: "Filters",
  })
  @ApiPropertyOptional()
  filters: object;

  constructor(partial: Partial<TrackAssessmentSearchDto>) {
    Object.assign(this, partial);
  }
}
