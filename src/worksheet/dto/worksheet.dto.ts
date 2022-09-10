import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class WorksheetDto {
  @Expose()
  worksheetId: string;

  @ApiProperty({
    description:
      "Instructions on how to understand, attempt or how the question set will be evaluated.",
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: "Worksheet Title",
  })
  @Expose()
  state: string;
  @ApiProperty({
    description: "Worksheet state",
  })
  @Expose()
  subject: string;
  @ApiProperty({
    description: "Worksheet subject",
  })
  @Expose()
  grade: string;
  @ApiProperty({
    description: "Worksheet grade level",
  })
  @Expose()
  level: string;
  @ApiProperty({
    description: "Worksheet level",
  })
  @Expose()
  instructions: string;

  @ApiProperty({
    description: "Feedback shown to the students after outcome processing.",
  })
  @Expose()
  feedback: any;

  @ApiProperty({
    description:
      "Hints are shown to the students after outcome processing or when the student requests for hints.",
  })
  @Expose()
  hints: any;

  @ApiProperty({
    description:
      "Determines the general paths that the student may take during the test session. Applicable only when questions data is present.",
  })
  @Expose()
  navigationMode: string;

  @ApiProperty({
    description:
      "Time limits for the complete set and/or for each question in the question set.",
  })
  @Expose()
  timeLimits: string;

  @ApiProperty({
    description:
      "Configuration to enable/disable hints for the student while using the question set.",
  })
  @Expose()
  showHints: string;

  @ApiProperty({
    description: " learning outcome",
  })
  @Expose()
  questions: [string];

  @ApiProperty({
    description: "Question Sets associated with the current set.",
  })
  @Expose()
  questionSets: any;

  @ApiProperty({
    description:
      "Information about the outcome variables of the question set, i.e the values that are output of a question set session.",
  })
  @Expose()
  outcomeDeclaration: any;

  @ApiProperty({
    description:
      "Rules to assign values to outcome variables based on the student's reponses.",
  })
  @Expose()
  outcomeProcessing: any;

  @ApiProperty({
    description:
      "A question set can be comprised of a materialized list of questions, or can also be dynamically built at runtime by using a criteria to select member questions.",
  })
  @Expose()
  questionSetType: string;

  @ApiProperty({
    description: "Criteria to be used when the set type is dynamic.",
  })
  @Expose()
  criteria: string;

  @ApiProperty({
    description: " ",
  })
  @Expose()
  usedFor: string;

  @ApiProperty({
    description: "Purpose served by the question.",
  })
  @Expose()
  purpose: string;

  @ApiProperty({
    description: "Visibility of the question set.",
  })
  @Expose()
  visibility: string;

  @ApiProperty({
    description:
      "Version of the QuML specification using which the question set is created.",
  })
  @Expose()
  qumlVersion: string;

  @ApiProperty({
    description: "Array of topic.",
  })
  @Expose()
  topic: [string];

  @ApiProperty({
    description: "source of worksheet",
  })
  @Expose()
  source: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdBy: string;

  @Expose()
  updatedBy: string;

  constructor(obj: any) {
    Object.assign(this, obj);
  }
}
