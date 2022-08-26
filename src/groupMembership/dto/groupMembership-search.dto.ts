import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GroupMembershipSearchDto {
  @ApiProperty({
    type: String,
    description: "Limit",
  })
  limit: string;

  @ApiProperty({
    type: Number,
    description: "Page",
  })
  page: number;

  @ApiProperty({
    type: Object,
    description: "Filters",
  })
  @ApiPropertyOptional()
  filters: object;

  constructor(partial: Partial<GroupMembershipSearchDto>) {
    Object.assign(this, partial);
  }
}
