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
    this.roleId = obj?.roleId ? `${obj.roleId}` : "";
    this.title = obj?.title ? `${obj.title}` : "";
    this.parentId = obj?.parentId ? `${obj.parentId}` : "";
    this.status = obj?.status ? `${obj.status}` : "";
    this.createdAt = obj?.created_at ? `${obj.created_at}` : "";
    this.updatedAt = obj?.updated_at ? `${obj.updated_at}` : "";
  }
}
