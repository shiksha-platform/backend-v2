import { Expose } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { Status } from "../enums/statuses.enum";

export class TrackAssessmentDto {
  @Expose()
  trackAssessmentId: string;

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

  @ApiProperty({
    description: "GroupId of teacher",
  })
  @Expose()
  groupId: string;

  @ApiProperty({
    description: "subject",
  })
  @Expose()
  subject: string;

  @Expose()
  totalScore: string;

  @Expose()
  date: string;

  @IsString()
  @IsIn([Status.NONE, Status.COMPLETED, Status.ABSENT])
  @ApiProperty({
    description:
      "Assessment Status - whether student was absent or he has completed the assessment.",
    enum: [Status.COMPLETED, Status.ABSENT],
    required: true,
  })
  @Expose()
  status: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  constructor(obj: any) {
    Object.assign(this, obj);
  }
}
