import { Exclude, Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class HolidayDto {
  @Expose()
  holidayId: string;

  @ApiProperty({
    type: String,
    description: "The date of the holiday",
    default: `eg. ${new Date().toISOString().split("T")[0]}`,
  })
  @Expose()
  date: Date;

  @ApiProperty({
    type: String,
    description: "The remark of the holiday",
  })
  @Expose()
  remark: string;

  @ApiProperty({
    type: String,
    description: "The year of the holiday",
    default: `eg. ${new Date().toISOString().split("T")[0]}`,
  })
  @Expose()
  year: Date;

  @ApiProperty({
    type: String,
    description: "The context of the holiday",
  })
  @Expose()
  context: string;

  @ApiProperty({
    type: String,
    description: "The context id of the holiday",
  })
  @Expose()
  contextId: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  constructor(obj: any) {
    Object.assign(this, obj);
  }
}
