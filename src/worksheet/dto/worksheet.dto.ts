import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class WorksheetDto {
  @ApiProperty()
  @Expose()
  worksheetId: string;

  @ApiProperty({
    description:
      "Instructions on how to understand, attempt or how the question set will be evaluated.",
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
  showHints: boolean;

  @ApiProperty({
    description: " learning outcome",
  })
  @Expose()
  questions: any;

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

  constructor(obj: any) {
    this.worksheetId = obj?.osid ? `${obj.osid}` : "";
    this.instructions = obj?.instructions ? `${obj.instructions}` : "";
    this.feedback = obj?.feedback ? `${obj.feedback}` : "";
    this.hints = obj?.hints ? `${obj.hints}` : "";
    this.navigationMode = obj?.navigationMode ? `${obj.navigationMode}` : "";
    this.timeLimits = obj?.timeLimits ? `${obj.timeLimits}` : "";
    this.showHints = obj?.showHints ? obj.showHints : "";
    this.questions = obj?.questions ? obj.questions : "";
    this.questionSets = obj?.questionSets ? `${obj.questionSets}` : "";
    this.outcomeDeclaration = obj?.outcomeDeclaration
      ? `${obj.outcomeDeclaration}`
      : "";
    this.outcomeProcessing = obj?.outcomeProcessing
      ? `${obj.outcomeProcessing}`
      : "";
    this.questionSetType = obj?.questionSetType ? `${obj.questionSetType}` : "";
    this.criteria = obj?.criteria ? `${obj.criteria}` : "";
    this.usedFor = obj?.usedFor ? `${obj.usedFor}` : "";
    this.purpose = obj?.purpose ? `${obj.purpose}` : "";
    this.visibility = obj?.visibility ? `${obj.visibility}` : "";
    this.qumlVersion = obj?.qumlVersion ? `${obj.qumlVersion}` : "";
  }
}
