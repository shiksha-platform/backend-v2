import { Expose } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class AnnouncementsFilterDto {
  @ApiPropertyOptional({
    type: String,
    description: "Page size(limit) for the announcement set",
  })
  @Expose()
  pageSize: string;

  @ApiPropertyOptional({
    type: String,
    description: "Page index(offset) for the announcement",
  })
  @Expose()
  pageIndex: string;

  @ApiPropertyOptional({
    type: String,
    description: "The title of announcement",
    default: "",
  })
  @Expose()
  title: string;

  @ApiPropertyOptional({
    type: Array,
    description: "The author of announcement",
    default: "",
  })
  @Expose()
  author: string[];

  @ApiPropertyOptional({
    type: Boolean,
    description: "Whether announcement is pinned or not",
    default: false,
  })
  @Expose()
  isPinned: boolean;

  @ApiPropertyOptional({
    type: Object,
    description: "Additional properties for pinned announcements",
    default: {},
  })
  @Expose()
  pinnedAnnouncementProperties: any;

  @ApiPropertyOptional({
    type: String,
    description: "The status of the announcement-draft or published",
    default: "",
  })
  @Expose()
  status: string;

  @ApiPropertyOptional({
    type: Array,
    description: "The type of announcement",
    default: "",
  })
  @Expose()
  announcementType: string[];

  @ApiPropertyOptional({
    type: String,
    description: "Start date for filtering announcement",
  })
  @Expose()
  startDate: string;

  @ApiPropertyOptional({
    type: String,
    description: "End date for filtering announcement",
  })
  @Expose()
  endDate: string;

  constructor(partial: Partial<AnnouncementsFilterDto>) {
    Object.assign(this, partial);
  }
}
