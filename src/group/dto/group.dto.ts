import { Exclude, Expose } from "class-transformer";
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
  IsIn,
  IsEnum,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  mediumOfInstruction,
  statusEnum,
  typeEnum,
} from "../enums/group-value.enum";

export class GroupDto {
  @Expose()
  groupId: string;

  @ApiPropertyOptional({
    type: String,
    description: "The schoolId of the group",
  })
  @Expose()
  schoolId: string;

  @ApiPropertyOptional({
    type: String,
    description: "The name of the group",
  })
  @Expose()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([typeEnum.static, typeEnum.dynamic])
  @IsEnum(typeEnum)
  @ApiPropertyOptional({
    enum: [typeEnum.static, typeEnum.dynamic],
    type: String,
    description: "The type of the group",
  })
  @Expose()
  type: string;

  @ApiPropertyOptional({
    type: String,
    description: "The section of the group",
  })
  @Expose()
  section: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([statusEnum.publish, statusEnum.unpublish, statusEnum.draft])
  @IsEnum(statusEnum)
  @ApiPropertyOptional({
    enum: [statusEnum.publish, statusEnum.unpublish, statusEnum.draft],
    description: "The status of the group",
  })
  @Expose()
  status: string;

  @ApiPropertyOptional({
    type: String,
    description: "Teacher Id of Group",
  })
  @Expose()
  teacherId: string;

  @ApiPropertyOptional({
    type: String,
    description: "Parent Id of Group",
  })
  @Expose()
  parentId: string;

  @ApiPropertyOptional()
  @Expose()
  deactivationReason: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([mediumOfInstruction.hindi, mediumOfInstruction.english])
  @IsEnum(mediumOfInstruction)
  @ApiPropertyOptional({
    enum: [mediumOfInstruction.hindi, mediumOfInstruction.english],
    type: String,
    description: "The mediumOfInstruction of the group",
  })
  @Expose()
  mediumOfInstruction: string;

  @ApiPropertyOptional({ type: "string", format: "binary" })
  @Expose()
  image: string;

  @ApiPropertyOptional()
  @Expose()
  metaData: [string];

  @ApiPropertyOptional()
  @Expose()
  option: [string];

  @ApiPropertyOptional({
    description: "Grade against group",
  })
  @Expose()
  gradeLevel: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  constructor(obj: any) {
    this.groupId = obj?.groupId ? `${obj.groupId}` : "";
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
    this.teacherId = obj?.teacherId ? `${obj.teacherId}` : "";
    this.parentId = obj?.parentId ? `${obj.parentId}` : "";
    this.image = obj?.image ? `${obj.image}` : "";
    this.metaData = obj?.metaData ? obj.metaData : [];
    this.option = obj?.option ? obj.option : [];
    this.gradeLevel = obj?.gradeLevel ? `${obj.gradeLevel}` : "";
    this.createdAt = obj?.created_at ? `${obj.created_at}` : "";
    this.updatedAt = obj?.updated_at ? `${obj.updated_at}` : "";
  }
}
