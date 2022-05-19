import { Exclude, Expose } from "class-transformer";
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GroupDto {
  @Expose()
  groupId: string;

  @ApiProperty({
    type: String,
    description: "The schoolId of the group",
  })
  @Expose()
  schoolId: string;

  @ApiProperty({
    type: String,
    description: "The name of the group",
  })
  @Expose()
  name: string;

  @ApiProperty({
    type: String,
    description: "The type of the group",
  })
  @Expose()
  type: string;

  @ApiProperty({
    type: String,
    description: "The section of the group",
  })
  @Expose()
  section: string;

  @ApiProperty({
    type: String,
    description: "The status of the group",
  })
  @Expose()
  status: string;

  @ApiProperty()
  @Expose()
  deactivationReason: string;

  @ApiProperty({
    type: String,
    description: "The mediumOfInstruction of the group",
  })
  @Expose()
  mediumOfInstruction: string;

  @ApiProperty({ type: "string", format: "binary" })
  @Expose()
  image: string;

  @ApiPropertyOptional()
  @Expose()
  metaData: [string];

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdBy: string;

  @Expose()
  updatedBy: string;

  constructor(obj: any) {
    this.groupId = obj?.osid ? `${obj.osid}` : "";
    this.schoolId = obj?.schoolId ? `${obj.schoolId}` : "";
    this.name = obj?.name ? `${obj.name}` : "";
    this.type = obj?.type ? `${obj.type}` : "";
    this.section = obj?.section ? `${obj.section}` : "";
    this.status = obj?.status ? `${obj.status}` : "";
    this.deactivationReason = obj?.deactivationReason
      ? `${obj.deactivationReason}`
      : "";
    this.mediumOfInstruction = obj?.mediumOfInstruction
      ? `${obj.mediumOfInstruction}`
      : "";
    this.image = obj?.image ? `${obj.image}` : "";
    this.metaData = obj?.metaData ? obj.metaData : [];
    this.createdAt = obj?.osCreatedAt ? `${obj.osCreatedAt}` : "";
    this.updatedAt = obj?.osUpdatedAt ? `${obj.osUpdatedAt}` : "";
    this.createdBy = obj?.osCreatedBy ? `${obj.osCreatedBy}` : "";
    this.updatedBy = obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "";
  }
}
