import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TemplateSearchDto {
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

  constructor(partial: Partial<TemplateSearchDto>) {
    Object.assign(this, partial);
  }
}
