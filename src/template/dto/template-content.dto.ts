import { Exclude, Expose } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TemplateContentDto {
  @Expose()
  templateContentId: string;

  @ApiProperty({
    description: "Template Id of template table",
  })
  @Expose()
  templateId: string;

  @ApiProperty({
    description: "State of tempalate content ",
  })
  @Expose()
  state: string;

  @ApiProperty({ description: "Language of tamplate" })
  @Expose()
  language: string;

  @ApiProperty({
    description: "Subject of template",
  })
  @Expose()
  subject: string;

  @ApiProperty({
    description: "Body of template",
  })
  @Expose()
  body: string;

  @ApiProperty({
    description: "Replacement Tags for template content",
  })
  @Expose()
  replacementTags: [];

  @ApiProperty({
    description: "User Control of template content",
  })
  @Expose()
  userControl: boolean;

  @ApiProperty({
    description: "Options for template",
  })
  @Expose()
  options: [];

  @ApiProperty({
    description: "schedule for notification",
  })
  @Expose()
  scheduleOn: string;

  constructor(obj: any) {
    this.templateContentId = obj?.osid ? `${obj.osid}` : "";
    this.templateId = obj?.templateId ? `${obj.templateId}` : "";
    this.state = obj?.state ? `${obj.state}` : "";
    this.language = obj?.language ? `${obj.language}` : "";
    this.subject = obj?.subject ? `${obj.subject}` : "";
    this.body = obj?.body ? `${obj.body}` : "";
    this.replacementTags = obj?.replacementTags ? obj.replacementTags : "";
    this.userControl = obj?.userControl ? obj.userControl : "";
    this.options = obj?.options ? obj.options : "";
    this.scheduleOn = obj?.scheduleOn ? `${obj.scheduleOn}` : "";
  }
}
