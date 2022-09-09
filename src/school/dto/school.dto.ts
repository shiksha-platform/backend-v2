import { Exclude, Expose } from "class-transformer";
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SchoolDto {
  @Expose()
  schoolId: string;

  @ApiProperty({
    type: String,
    description: "The schoolName of the school",
  })
  @Expose()
  schoolName: string;

  @ApiProperty({
    type: String,
    description: "The email of the school",
  })
  @IsEmail()
  @Expose()
  email: string;

  @ApiProperty({
    type: String,
    description: "The udise of the school",
  })
  @Expose()
  udise: string;

  @ApiProperty({
    type: [String],
    description: "The  medium of instruction of the school",
  })
  @Expose()
  mediumOfInstruction: [string];

  @ApiProperty({
    type: Number,
    description: "The phone number of the school",
  })
  @IsNumber()
  @Expose()
  phoneNumber: Number;

  @ApiProperty({
    type: String,
    description: "The address of the school",
  })
  @Expose()
  address: string;

  @ApiProperty({
    type: String,
    description: "The schoolType of the school",
  })
  @Expose()
  schoolType: string;

  @ApiProperty({
    type: String,
    description: "The website of the school",
  })
  @Expose()
  website: string;

  @ApiProperty({
    type: String,
    description: "The Head master of the school",
  })
  @Expose()
  headMaster: string;

  @ApiProperty({
    type: String,
    description: "The Board of the school",
  })
  @Expose()
  board: string;

  @ApiProperty({
    type: String,
    description: "The village of the school",
  })
  @Expose()
  village: string;

  @ApiProperty({
    type: String,
    description: "The block of the school",
  })
  @Expose()
  block: string;

  @ApiProperty({
    type: String,
    description: "The district of the school",
  })
  @Expose()
  district: string;

  @ApiProperty({
    type: String,
    description: "The stateId of the school",
  })
  @Expose()
  stateId: string;

  @ApiProperty({
    type: Number,
    description: "The pincode of the school",
  })
  @Expose()
  pincode: Number;

  @ApiProperty({
    type: String,
    description: "The cluster of the school",
  })
  @Expose()
  cluster: string;

  @ApiProperty({
    type: String,
    description: "The locationId of the school",
  })
  @Expose()
  locationId: string;

  @ApiProperty({
    type: String,
    description: "The enrollCount of the school",
  })
  @Expose()
  enrollCount: string;

  @ApiProperty({
    type: String,
    description: "The status of the school",
  })
  @Expose()
  status: string;

  @ApiProperty({
    type: Number,
    description: "The latitude of the school",
  })
  @Expose()
  latitude: Number;

  @ApiProperty({
    type: Number,
    description: "The longitude of the school",
  })
  @Expose()
  longitude: Number;

  @ApiPropertyOptional()
  @Expose()
  metaData: [string];

  @ApiPropertyOptional({})
  @Expose()
  deactivationReason: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  constructor(obj: any) {
    Object.assign(this, obj);
  }
}
