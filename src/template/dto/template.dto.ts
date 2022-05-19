import { Exclude, Expose } from "class-transformer";
import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from "@nestjs/swagger";

export class TemplateDto {
  @Expose()
  templateId: string;

  @ApiProperty({
    description: "Key for template",
  })
  @Expose()
  key: string;

  @ApiProperty({
    description: "Title of template",
  })
  @Expose()
  title: string;

  @ApiProperty({
    description: "Module of template",
  })
  @Expose()
  module: string;

  @ApiProperty({
    description: "State of template",
  })
  @Expose()
  state: string;

  @ApiProperty({
    description: "replacement Tags for template",
  })
  @Expose()
  replacementTags: string;

  @ApiProperty({
    description: "User control of template",
  })
  @Expose()
  userControl: boolean;

  constructor(obj: any) {
    this.templateId = obj?.osid ? `${obj.osid}` : "";
    this.key = obj?.key ? `${obj.key}` : "";
    this.title = obj?.title ? `${obj.title}` : "";
    this.module = obj?.module ? `${obj.module}` : "";
    this.state = obj?.state ? `${obj.state}` : "";
    this.replacementTags = obj?.replacementTags ? `${obj.replacementTags}` : "";
    this.userControl = obj?.userControl ? obj.userControl : "";
  }
}
