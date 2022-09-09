import { Expose } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AnnouncementsDto {
  @ApiProperty({
    type: String,
    description: "The id of the announcement ",
    default: "",
  })
  @Expose()
  announcementId: string;

  @ApiPropertyOptional({
    type: String,
    description: "The data of the announcement",
    default: "",
  })
  @Expose()
  data: string;

  @ApiProperty({
    type: String,
    description: "The type of announcement",
    default: "",
  })
  @Expose()
  announcementType: string;

  @ApiProperty({
    type: String,
    description: "The title of announcement",
    default: "",
  })
  @Expose()
  title: string;

  @ApiProperty({
    type: String,
    description: "The date modified",
    default: "",
  })
  @Expose()
  dateModified: string;

  @ApiPropertyOptional({
    type: Array,
    description: "Additional properties of an announcement",
    default: "",
  })
  @Expose()
  additionalTags: string[];

  @ApiProperty({
    type: Boolean,
    description: "Whether announcement is pinned or not",
    default: false,
  })
  @Expose()
  isPinned: boolean;

  @ApiProperty({
    type: String,
    description: "The status of the announcement-draft or published",
    default: "",
  })
  @Expose()
  status: string;

  @ApiProperty({
    type: String,
    description: "The author of the announcement",
    default: "",
  })
  @Expose()
  author: string;

  @ApiPropertyOptional({
    type: Object,
    description: "Additional properties for pinned announcements",
    default: {},
  })
  @Expose()
  pinnedAnnouncementProperties: any;

  constructor(obj: any) {
    Object.assign(this, obj);
  }
}
