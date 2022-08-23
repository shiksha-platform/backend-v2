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
    this.schoolId = obj?.schoolId ? `${obj.schoolId}` : "";
    this.schoolName = obj?.schoolName ? `${obj.schoolName}` : "";
    this.email = obj?.email ? `${obj.email}` : "";
    this.udise = obj?.udise ? `${obj.udise}` : "";
    this.mediumOfInstruction = obj?.mediumOfInstruction
      ? obj.mediumOfInstruction
      : "";
    this.phoneNumber = obj?.phoneNumber ? obj.phoneNumber : "";
    this.address = obj?.address ? obj.address : "";
    this.schoolType = obj?.schoolType ? `${obj.schoolType}` : "";
    this.website = obj?.website ? `${obj.website}` : "";
    this.village = obj?.village ? `${obj.village}` : "";
    this.block = obj?.block ? `${obj.block}` : "";
    this.district = obj?.district ? `${obj.district}` : "";
    this.stateId = obj?.stateId ? `${obj.stateId}` : "";
    this.pincode = obj?.pincode ? obj.pincode : "";
    this.locationId = obj?.locationId ? `${obj.locationId}` : "";
    this.enrollCount = obj?.enrollCount ? `${obj.enrollCount}` : "";
    this.status = obj?.status ? `${obj.status}` : "";
    this.latitude = obj?.latitude ? obj.latitude : "";
    this.longitude = obj?.longitude ? obj.longitude : "";
    this.metaData = obj?.metaData ? obj.metaData : [];
    this.deactivationReason = obj?.deactivationReason
      ? `${obj.deactivationReason}`
      : "";
    this.createdAt = obj?.created_at ? `${obj.created_at}` : "";
    this.updatedAt = obj?.updated_at ? `${obj.updated_at}` : "";
  }
}
