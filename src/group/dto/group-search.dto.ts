import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GroupSearchDto {
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

  constructor(partial: Partial<GroupSearchDto>) {
    Object.assign(this, partial);
  }
}
