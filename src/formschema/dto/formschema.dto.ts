import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

export class FormschemaDto {
  @Expose()
  FormschemaId: string;
  @ApiProperty()
  @Expose()
  moduleId: string;
  @ApiProperty()
  @Expose()
  schema: string;
  @ApiPropertyOptional()
  @Expose()
  uiSchema: string;

  @ApiPropertyOptional()
  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdBy: string;

  @Expose()
  updatedBy: string;

  constructor(obj: any) {
    this.FormschemaId = obj?.osid ? `${obj.osid}` : "";
    this.moduleId = obj?.moduleId ? `${obj.moduleId}` : "";
    this.schema = obj?.schema ? `${obj.schema}` : "";
    this.uiSchema = obj?.uiSchema ? `${obj.uiSchema}` : "";
    this.createdAt = obj?.osCreatedAt ? `${obj.osCreatedAt}` : "";
    this.updatedAt = obj?.osUpdatedAt ? `${obj.osUpdatedAt}` : "";
    this.createdBy = obj?.osCreatedBy ? `${obj.osCreatedBy}` : "";
    this.updatedBy = obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "";
  }
}
