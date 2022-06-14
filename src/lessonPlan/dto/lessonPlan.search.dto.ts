import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class LessonPlanSearchDto {
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

  constructor(partial: Partial<LessonPlanSearchDto>) {
    Object.assign(this, partial);
  }
}
