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

  constructor(obj: any) {
    Object.assign(this, obj);
  }
}
