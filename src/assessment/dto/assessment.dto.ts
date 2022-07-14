import { Exclude, Expose } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AssessmentDto {
  @Expose()
  assessmentId: string;

  @ApiProperty({
    description: "JSON string of filters selected for the assessment ",
  })
  @Expose()
  filter: string;

  @ApiProperty({
    description: "Assessment type, spot assessment or exam",
  })
  @Expose()
  type: string;

  @ApiProperty({
    description:
      "JSON encoded QUML player response against the given questions of the assessment",
  })
  @Expose()
  answersheet: string;

  @ApiPropertyOptional({
    description: "Assesment set id",
  })
  @Expose()
  assessmentsetId: string;

  @Expose()
  questions: [string];

  @Expose()
  score: string;

  @Expose()
  result: string;

  @ApiProperty({
    description: "reviewerId",
  })
  @Expose()
  reviewerId: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdBy: string;

  @Expose()
  updatedBy: string;

  constructor(obj: any) {
    this.assessmentId = obj?.osid ? `${obj.osid}` : "";
    this.filter = obj?.filter ? `${obj.filter}` : "";
    this.type = obj?.type ? `${obj.type}` : "";
    this.questions = obj?.questions ? obj.questions : "";
    this.assessmentsetId = obj?.assessmentsetId ? `${obj.assessmetsentId}` : "";
    this.answersheet = obj?.answersheet ? `${obj.answersheet}` : "";
    this.score = obj?.score ? `${obj.score}` : "";
    this.result = obj?.result ? `${obj.result}` : "";
    this.reviewerId = obj?.reviewerId ? `${obj.reviewerId}` : "";
    this.createdAt = obj?.osCreatedAt ? `${obj.osCreatedAt}` : "";
    this.updatedAt = obj?.osUpdatedAt ? `${obj.osUpdatedAt}` : "";
    this.createdBy = obj?.osCreatedBy ? `${obj.osCreatedBy}` : "";
    this.updatedBy = obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "";
  }
}
