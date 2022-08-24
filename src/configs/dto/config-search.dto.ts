import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ConfigSearchDto {
  @ApiProperty({
    type: String,
    description: "Limit",
  })
  limit: string;

  @ApiProperty({
    type: String,
    description: "Page",
  })
  page: Number;

  @ApiProperty({
    type: Object,
    description: "Filters",
  })
  @ApiPropertyOptional()
  filters: object;

  constructor(partial: Partial<ConfigSearchDto>) {
    Object.assign(this, partial);
  }
}
