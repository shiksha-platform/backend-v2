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

  @Expose()
  scheduleDate: string;

  constructor(obj: any) {
    Object.assign(this, obj);
  }
}
