import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class QuestionSearchDto {
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

  constructor(partial: Partial<QuestionSearchDto>) {
    Object.assign(this, partial);
  }
}
