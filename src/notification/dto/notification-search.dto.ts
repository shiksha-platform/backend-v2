import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class NotificationSearchDto {
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

  constructor(partial: Partial<NotificationSearchDto>) {
    Object.assign(this, partial);
  }
}
