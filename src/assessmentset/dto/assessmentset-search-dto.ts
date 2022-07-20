import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AssessmentSetSearchDto {
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

  constructor(partial: Partial<AssessmentSetSearchDto>) {
    Object.assign(this, partial);
  }
}
