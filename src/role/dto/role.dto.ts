import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class RoleDto {
  @Expose()
  roleId: string;

  @ApiProperty({})
  @Expose()
  title: string;

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
    Object.assign(this, obj);
  }
}
