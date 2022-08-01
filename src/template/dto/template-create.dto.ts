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
    this.body = obj?.body ? `${obj.body}` : "";
    this.type = obj?.type ? `${obj.type}` : "";
    this.user = obj?.user ? `${obj.user}` : "";
    this.tag = obj?.tag;
    this.createdAt = obj?.createdAt ? `${obj.createdAt}` : "";
    this.updatedAt = obj?.updatedAt ? `${obj.updatedAt}` : "";
  }
}
