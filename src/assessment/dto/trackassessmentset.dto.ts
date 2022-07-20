import { Exclude, Expose } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TrackAssessmentDto {
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

  @ApiPropertyOptional({
    description: "Array of question Id's against the assessment is given",
  })
  @Expose()
  questions: [string];

  @ApiPropertyOptional({
    description: "Assessment questions source",
  })
  @Expose()
  source: string;

  @ApiProperty({
    description:
      "JSON encoded QUML player response against the given questions of the assessment",
  })
  @Expose()
  answersheet: string;

  @Expose()
  score: string;

  @ApiProperty({
    description: "student Id who has given assessment",
  })
  @Expose()
  studentId: string;

  @ApiProperty({
    description: "Teacher Id who has assigned the assessment",
  })
  @Expose()
  teacherId: string;

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
    this.source = obj?.source ? `${obj.source}` : "";
    this.answersheet = obj?.answersheet ? `${obj.answersheet}` : "";
    this.score = obj?.score ? `${obj.score}` : "";
    this.studentId = obj?.studentId ? `${obj.studentId}` : "";
    this.teacherId = obj?.teacherId ? `${obj.teacherId}` : "";
    this.createdAt = obj?.osCreatedAt ? `${obj.osCreatedAt}` : "";
    this.updatedAt = obj?.osUpdatedAt ? `${obj.osUpdatedAt}` : "";
    this.createdBy = obj?.osCreatedBy ? `${obj.osCreatedBy}` : "";
    this.updatedBy = obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "";
  }
}
