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
  gradetype: string;

  @ApiProperty({
    description: "Extra data against assessment sent",
  })
  @Expose()
  options: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdBy: string;

  @Expose()
  updatedBy: string;

  constructor(obj: any) {
    this.assessmentsetId = obj?.osid ? `${obj.osid}` : "";
    this.title = obj?.title ? `${obj.title}` : "";
    this.type = obj?.type ? obj.type : "";
    this.typeDetails = obj?.typeDetails ? obj.typeDetails : "";
    this.gradetype = obj?.gradetype ? `${obj.gradetype}` : "";
    this.options = obj?.options ? `${obj.options}` : "";
    this.createdAt = obj?.osCreatedAt ? `${obj.osCreatedAt}` : "";
    this.updatedAt = obj?.osUpdatedAt ? `${obj.osUpdatedAt}` : "";
    this.createdBy = obj?.osCreatedBy ? `${obj.osCreatedBy}` : "";
    this.updatedBy = obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "";
  }
}
