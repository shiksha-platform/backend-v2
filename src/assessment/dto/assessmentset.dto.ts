import { Exclude, Expose } from "class-transformer";
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
    description: "Array of question Id's against the assessment set",
  })
  @Expose()
  questions: [string];

  @ApiPropertyOptional({
    description: "Worksheet Id against assesment set",
  })
  @Expose()
  worksheetId: number;

  @ApiProperty({
    description: "Number of times assesment is allowed to attempt",
  })
  @Expose()
  attempts: number;

  @ApiProperty({
    description: "Assessmentset type, Ex - marks, boolean, grade",
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
    this.questions = obj?.questions ? obj.questions : "";
    this.worksheetId = obj?.worksheetId ? obj.worksheetId : "";
    this.attempts = obj?.attempts ? obj.attempts : "";
    this.gradetype = obj?.gradetype ? `${obj.gradetype}` : "";
    this.options = obj?.options ? `${obj.options}` : "";
    this.createdAt = obj?.osCreatedAt ? `${obj.osCreatedAt}` : "";
    this.updatedAt = obj?.osUpdatedAt ? `${obj.osUpdatedAt}` : "";
    this.createdBy = obj?.osCreatedBy ? `${obj.osCreatedBy}` : "";
    this.updatedBy = obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "";
  }
}
