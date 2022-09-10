import { Expose } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AssessmentsetDto {
  @Expose()
  assessmentsetId: string;

  @ApiProperty({
    description: "Assessment set title ",
  })
  @Expose()
  title: string;

  @ApiPropertyOptional({
    description: "Assessment set Type",
  })
  @Expose()
  type: string;

  @ApiProperty({
    description: "Assessmentset type, Ex - marks, boolean, grade",
  })
  @Expose()
  typeDetails: string;

  @ApiProperty({
    description: "Assessmentset type details",
  })
  @Expose()
  gradeType: string;

  @ApiProperty({
    description: "Extra data against assessment sent",
  })
  @Expose()
  options: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  constructor(obj: any) {
    Object.assign(this, obj);
  }
}
