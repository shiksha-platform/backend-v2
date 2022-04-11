import { Exclude, Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class HolidayDto {
  @Expose()
  holidayId: string;

  @ApiProperty({
    type: String,
    description: "The date of the holiday",
  })
  @Expose()
  date: string;

  @ApiProperty({
    type: String,
    description: "The remark of the holiday",
  })
  @Expose()
  remark: string;

  @ApiProperty({
    type: String,
    description: "The year of the holiday",
  })
  @Expose()
  year: string;

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

  @Expose()
  createdBy: string;

  @Expose()
  updatedBy: string;
  constructor(obj: HolidayDto) {
    Object.assign(this, obj);
  }
}
