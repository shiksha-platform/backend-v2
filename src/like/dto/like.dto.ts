import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class LikeDto {
  @Expose()
  likeId: string;

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
  type: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  constructor(obj: any) {
    this.likeId = obj?.likeId ? `${obj.likeId}` : "";
    this.contextId = obj?.contextId ? `${obj.contextId}` : "";
    this.context = obj?.context ? `${obj.context}` : "";
    this.userId = obj?.userId ? `${obj.userId}` : "";
    this.type = obj?.type ? `${obj.type}` : "";
    this.createdAt = obj?.created_at ? `${obj.created_at}` : "";
    this.updatedAt = obj?.updated_at ? `${obj.updated_at}` : "";
  }
}
