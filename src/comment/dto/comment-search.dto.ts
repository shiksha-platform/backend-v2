import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CommentSearchDto {
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

  constructor(partial: Partial<CommentSearchDto>) {
    Object.assign(this, partial);
  }
}
