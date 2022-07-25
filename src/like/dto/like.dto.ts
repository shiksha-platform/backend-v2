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

  @Expose()
  userType: string;

  @ApiProperty({})
  @Expose()
  type: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdBy: string;

  @Expose()
  updatedBy: string;
  constructor(obj: any) {
    this.likeId = obj?.osid ? `${obj.osid}` : "";
    this.contextId = obj?.contextId ? `${obj.contextId}` : "";
    this.context = obj?.context ? `${obj.context}` : "";
    this.userId = obj?.userId ? `${obj.userId}` : "";
    this.userType = obj?.userType ? `${obj.userType}` : "";
    this.type = obj?.type ? `${obj.type}` : "";
    this.createdAt = obj?.osCreatedAt ? `${obj.osCreatedAt}` : "";
    this.updatedAt = obj?.osUpdatedAt ? `${obj.osUpdatedAt}` : "";
    this.createdBy = obj?.osCreatedBy ? `${obj.osCreatedBy}` : "";
    this.updatedBy = obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "";
  }
}
