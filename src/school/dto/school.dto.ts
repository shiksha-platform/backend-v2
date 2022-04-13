import { Exclude, Expose } from "class-transformer";
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

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
  @Expose()
  email: string;

  @ApiProperty({
    type: String,
    description: "The udise of the school",
  })
  @Expose()
  udise: string;

  @ApiProperty({
    type: String,
    description: "The Primary Medium of the school",
  })
  @Expose()
  primaryMedium: string;

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
    type: String,
    description: "The latitude of the school",
  })
  @Expose()
  latitude: Number;

  @ApiProperty({
    type: String,
    description: "The longitude of the school",
  })
  @Expose()
  longitude: Number;

  constructor(obj: SchoolDto) {
    Object.assign(this, obj);
  }
}
