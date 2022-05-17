import { Exclude, Expose } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TemplateContentDto {
  @Expose()
  templateContentId: string;

  @ApiProperty()
  @Expose()
  templateId: string;

  @ApiProperty()
  @Expose()
  state: string;

  @ApiProperty()
  @Expose()
  language: string;

  @ApiProperty()
  @Expose()
  subject: string;

  @ApiProperty()
  @Expose()
  body: string;

  @ApiProperty()
  @Expose()
  replacementTags: [string];

  @ApiProperty()
  @Expose()
  userControl: boolean;

  @ApiProperty()
  @Expose()
  type: string;

  @ApiProperty()
  @Expose()
  user: string;

  @ApiProperty()
  @Expose()
  adapter: string;

  @ApiProperty()
  @Expose()
  adminToken: string;

  constructor(obj: any) {
    this.templateContentId = obj?.osid ? `${obj.osid}` : "";
    this.templateId = obj?.templateId ? `${obj.templateId}` : "";
    this.state = obj?.state ? `${obj.state}` : "";
    this.language = obj?.language ? `${obj.language}` : "";
    this.subject = obj?.subject ? `${obj.subject}` : "";
    this.body = obj?.body ? `${obj.body}` : "";
    this.replacementTags = obj?.replacementTags ? obj.replacementTags : "";
    this.userControl = obj?.userControl ? obj.userControl : "";
    this.type = obj?.type ? obj.type : "";
    this.user = obj?.user ? obj.user : "";
    this.adapter = obj?.adapter ? obj.adapter : "";
    this.adminToken = obj?.adminToken ? obj.adminToken : "";
  }
}
