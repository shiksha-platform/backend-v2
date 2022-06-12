import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class LikeDto {
  @Expose()
  contextId: string;

  @ApiProperty({})
  @Expose()
  context: string;

  @ApiProperty({})
  @Expose()
  userId: string;

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
    this.contextId = obj?.osid ? `${obj.osid}` : "";
    this.context = obj?.context ? `${obj.context}` : "";
    this.userId = obj?.userId ? `${obj.userId}` : "";
    this.type = obj?.type ? `${obj.type}` : "";
    this.createdAt = obj?.osCreatedAt ? `${obj.osCreatedAt}` : "";
    this.updatedAt = obj?.osUpdatedAt ? `${obj.osUpdatedAt}` : "";
    this.createdBy = obj?.osCreatedBy ? `${obj.osCreatedBy}` : "";
    this.updatedBy = obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "";
  }
}
