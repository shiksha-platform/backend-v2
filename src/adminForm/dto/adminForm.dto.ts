import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

export class AdminFormDto {
  @Expose()
  adminFormId: string;
  @ApiProperty()
  @Expose()
  moduleId: string;
  @ApiProperty()
  @Expose()
  schema: any;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdBy: string;

  @Expose()
  updatedBy: string;

  constructor(obj: any) {
    this.adminFormId = obj?.osid ? `${obj.osid}` : "";
    this.moduleId = obj?.moduleId ? `${obj.moduleId}` : "";
    this.schema = obj?.schema ? `${obj.schema}` : "";
    this.createdAt = obj?.osCreatedAt ? `${obj.osCreatedAt}` : "";
    this.updatedAt = obj?.osUpdatedAt ? `${obj.osUpdatedAt}` : "";
    this.createdBy = obj?.osCreatedBy ? `${obj.osCreatedBy}` : "";
    this.updatedBy = obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "";
  }
}
