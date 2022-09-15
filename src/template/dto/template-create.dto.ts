import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class TemplateCreateDto {
  @ApiProperty({
    description: "Body of worksheet Template",
  })
  @Expose()
  body: string;

  @ApiProperty({
    description: "Type of the template",
  })
  @Expose()
  type: string;

  @ApiProperty({
    description: "tags for the template",
  })
  @Expose()
  tag: [];

  @ApiProperty({
    description: "User id",
  })
  @Expose()
  user: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
  constructor(obj: any) {
    Object.assign(this, obj);
  }
}
