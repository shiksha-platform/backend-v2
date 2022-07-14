import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AssessmentSearchDto {
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

  constructor(partial: Partial<AssessmentSearchDto>) {
    Object.assign(this, partial);
  }
}
