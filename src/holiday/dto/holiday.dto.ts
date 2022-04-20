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
  constructor(obj: any) {
    this.holidayId = obj?.osid ? `${obj.osid}` : "";
    this.date = `${obj.date}`;
    this.remark = obj?.remark ? `${obj.remark}` : "";
    this.year = obj?.year ? `${obj.year}` : "";
    this.context = obj?.context ? `${obj.context}` : "";
    this.contextId = obj?.contextId ? `${obj.contextId}` : "";
    this.createdAt = obj?.osCreatedAt ? `${obj.osCreatedAt}` : "";
    this.updatedAt = obj?.osUpdatedAt ? `${obj.osUpdatedAt}` : "";
    this.createdBy = obj?.osCreatedBy ? `${obj.osCreatedBy}` : "";
    this.updatedBy = obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "";
  }
}
