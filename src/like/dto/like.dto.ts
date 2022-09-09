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
    Object.assign(this, obj);
  }
}
