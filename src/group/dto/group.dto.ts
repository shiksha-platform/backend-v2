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

  @ApiPropertyOptional({
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

  @ApiPropertyOptional({
    type: String,
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

  @ApiPropertyOptional({
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
    Object.assign(this, obj);
  }
}
