import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class MenuSearchDto {
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

  constructor(partial: Partial<MenuSearchDto>) {
    Object.assign(this, partial);
  }
}
