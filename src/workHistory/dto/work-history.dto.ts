import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class WorkHistoryDto {
  @Expose()
  workHistoryId: string;

  @ApiProperty({
    type: String,
    description: "ID of the user for which posting info is stored",
  })
  @Expose()
  userId: string;

  @ApiProperty({
    type: String,
    description: "role of the user ",
  })
  @Expose()
  role: string;

  @ApiProperty({
    type: String,
    description: "Designation of the user at time of joining that posting",
  })
  @Expose()
  joiningDesignation: string;

  @ApiProperty({
    type: String,
    description: "Designation of the user while leaving that posting",
  })
  @Expose()
  leavingDesignation: string;

  @ApiProperty({
    type: String,
    description: "Date of joining in that posting",
    default: new Date().toISOString().split("T")[0],
  })
  @Expose()
  dateOfJoining: Date;

  @ApiProperty({
    type: String,
    description: "Date of relieving from that posting",
    default: new Date().toISOString().split("T")[0],
  })
  @Expose()
  dateOfRelieving: Date;

  @ApiProperty({
    type: String,
    description: "Reason of closure of that posting",
  })
  @Expose()
  reason: string;

  @ApiProperty({
    type: String,
    description: "any remark",
  })
  @Expose()
  remark: string;

  @ApiProperty({})
  @Expose()
  cadre: string;

  @ApiProperty({})
  @Expose()
  transferOrderNumber: string;

  @ApiProperty({})
  @Expose()
  placeOfPosting: string;

  @ApiProperty({
    default: new Date().toISOString().split("T")[0],
  })
  @Expose()
  dateOfOrder: string;

  @ApiProperty({})
  @Expose()
  modeOfPosting: string;

  @ApiProperty({})
  @Expose()
  organizationName: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  constructor(obj: any) {
    Object.assign(this, obj);
  }
}
