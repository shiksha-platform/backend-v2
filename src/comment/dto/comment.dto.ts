import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CommentDto {
  @Expose()
  commentId: string;

  @ApiProperty({})
  @Expose()
  contextId: string;

  @ApiProperty({})
  @Expose()
  context: string;

  @Expose()
  userId: string;

  @Expose()
  userType: string;

  @ApiProperty({})
  @Expose()
  comment: string;

  @ApiProperty({})
  @Expose()
  privacy: string;

  @ApiProperty({})
  @Expose()
  parentId: string;

  @ApiProperty({})
  @Expose()
  status: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdBy: string;

  @Expose()
  updatedBy: string;

  constructor(obj: any) {
    this.commentId = obj?.osid ? `${obj.osid}` : "";
    this.contextId = obj?.contextId ? `${obj.contextId}` : "";
    this.context = obj?.context ? `${obj.context}` : "";
    this.userId = obj?.userId ? `${obj.userId}` : "";
    this.userType = obj?.userType ? `${obj.userType}` : "";
    this.comment = obj?.comment ? `${obj.comment}` : "";
    this.privacy = obj?.privacy ? `${obj.privacy}` : "";
    this.parentId = obj?.parentId ? `${obj.parentId}` : "";
    this.status = obj?.status ? `${obj.status}` : "";
    this.createdAt = obj?.osCreatedAt ? `${obj.osCreatedAt}` : "";
    this.updatedAt = obj?.osUpdatedAt ? `${obj.osUpdatedAt}` : "";
    this.createdBy = obj?.osCreatedBy ? `${obj.osCreatedBy}` : "";
    this.updatedBy = obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "";
  }
}
