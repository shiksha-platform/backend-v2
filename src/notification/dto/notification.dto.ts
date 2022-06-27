import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class NotificationLogDto {
  @Expose()
  notificationLogId: string;
  @ApiProperty({
    description: "Content of notification",
  })
  @Expose()
  content: string;

  @ApiProperty({
    description: "Recepients of notification",
  })
  @Expose()
  recepients: [];

  @ApiProperty({
    description: "Module of notification",
  })
  @Expose()
  module: string;

  @ApiProperty({
    description: "Template content Id",
  })
  @Expose()
  templateContentId: string;

  @ApiProperty({
    description: "medium of notification",
  })
  @Expose()
  medium: string;

  @ApiProperty({
    description: "Sent date of notification",
  })
  @Expose()
  sentDate: string;

  @Expose()
  sentBy: string;

  @ApiProperty({
    description: "options of notification",
  })
  @Expose()
  options: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdBy: string;

  @Expose()
  updatedBy: string;

  @Expose()
  templateId: string;

  constructor(obj: any) {
    this.notificationLogId = obj?.osid ? `${obj.osid}` : "";
    this.content = obj?.content ? `${obj.content}` : "";
    this.recepients = obj?.recepients ? obj.recepients : [];
    this.module = obj?.module ? `${obj.module}` : "";
    this.templateContentId = obj?.templateContentId
      ? `${obj.templateContentId}`
      : "";
    this.templateId = obj?.templateId ? `${obj.templateId}` : "";
    this.medium = obj?.medium ? `${obj.medium}` : "";
    this.sentDate = obj?.sentDate ? `${obj.sentDate}` : "";
    this.sentBy = obj?.sentBy ? `${obj.sentBy}` : "";
    this.options = obj?.options ? obj.options : "";
    this.createdAt = obj?.osCreatedAt ? `${obj.osCreatedAt}` : "";
    this.updatedAt = obj?.osUpdatedAt ? `${obj.osUpdatedAt}` : "";
    this.createdBy = obj?.osCreatedBy ? `${obj.osCreatedBy}` : "";
    this.updatedBy = obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "";
  }
}
