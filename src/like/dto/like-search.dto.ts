import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class LikeSearchDto {
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

  constructor(partial: Partial<LikeSearchDto>) {
    Object.assign(this, partial);
  }
}
