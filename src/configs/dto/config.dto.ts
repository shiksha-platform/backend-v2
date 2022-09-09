import { Exclude, Expose } from "class-transformer";
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ConfigDto {
  @Expose()
  configId: string;

  @ApiProperty({
    type: String,
    description: "Module to which this config record belongs eg: attendance",
  })
  @Expose()
  module: string;

  @ApiProperty({
    type: String,
    description: "The key for the config eg: attendance_states",
  })
  @Expose()
  key: string;

  @ApiProperty({
    type: String,
    description:
      "The value for the key eg: ['Present', 'Absent', 'Late'] for the attendance_states key",
  })
  @Expose()
  value: string;

  @ApiProperty({
    type: String,
    description:
      "If the config has been overriden at a school level the context will be school, otherwise it will be empty",
  })
  @Expose()
  context: string;

  @ApiProperty({
    type: String,
    description:
      "If this is a school level config (indicated by context = school), this field has the schoolId",
  })
  @Expose()
  contextId: string;

  @ApiProperty({
    type: Boolean,
    description:
      "Indicates if this config is allowed to be updated by a user with another role (eg: can the deployer set this config to be updated by other roles)",
  })
  @Expose()
  canOverride: boolean;

  @ApiProperty({
    type: String,
    description: "List of roles that are allowed to update this config",
  })
  @Expose()
  overrideBy: string;

  @ApiProperty({
    type: Boolean,
    description:
      "Is this config that can be passed on to the client side eg: to the react frontend. Configs like API credentials should not be allowed to be accessed in the frontend",
  })
  @Expose()
  isPublic: boolean;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  constructor(obj: any) {
    Object.assign(this, obj);
  }
}
