import { Exclude, Expose } from "class-transformer";
import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from "@nestjs/swagger";

export class TemplateDto {
  @Expose()
  templateId: string;

  @ApiProperty()
  @Expose()
  key: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  module: string;

  @ApiProperty()
  @Expose()
  state: string;

  @ApiProperty()
  @Expose()
  replacementTags: string;

  @ApiProperty()
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
