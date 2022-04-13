import { Exclude, Expose } from "class-transformer";
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

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
    description: "The status of the group",
  })
  @Expose()
  status: string;

  @ApiProperty({
    type: String,
    description: "The mediumOfInstruction of the group",
  })
  @Expose()
  mediumOfInstruction: string;

  @ApiProperty({ type: "string", format: "binary" })
  @Expose()
  image: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdBy: string;

  @Expose()
  updatedBy: string;

  constructor(partial: GroupDto) {
    Object.assign(this, partial);
  }
}
