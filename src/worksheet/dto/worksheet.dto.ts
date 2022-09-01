import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEnum, IsIn, IsNotEmpty, IsString } from "class-validator";
import {
  classList,
  enumOption,
  source,
  subjectList,
  visibility,
} from "../enums/worksheet.enums";

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
    description: "Worksheet state",
  })
  @Expose()
  state: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([
    subjectList.hindi,
    subjectList.english,
    subjectList.bengali,
    subjectList.marathi,
    subjectList.science,
    subjectList.sanskrit,
    subjectList.geography,
    subjectList.spanish,
    subjectList.tamil,
    subjectList.telugu,
    subjectList.kannada,
    subjectList.arabicbidaytularebia,
    subjectList.balbharatikannada,
    subjectList.cocurricular,
    subjectList.evs,
    subjectList.evspart1,
    subjectList.evspart2,
    subjectList.gujarati,
    subjectList.defencestudies,
    subjectList.gulhaafarsi,
    subjectList.history,
    subjectList.historyandcivics,
    subjectList.historyandpoliticalscience,
    subjectList.khelekaresikhe,
    subjectList.khelokarusikhu,
    subjectList.khelukarushiku,
    subjectList.kumarbharatikannada,
    subjectList.marathishikshaksanhita,
    subjectList.mathematics,
    subjectList.playdolearn,
    subjectList.scholarshipenglish,
    subjectList.scholarshipintelligencetest,
    subjectList.scholarshipmarathi,
    subjectList.scholarshipmathematics,
    subjectList.secretarialpracticesp,
    subjectList.selfdevelopment,
    subjectList.urdu,
  ])
  @IsEnum(subjectList)
  @ApiProperty({
    type: String,
    description: "Worksheet subject",
    enum: [
      subjectList.hindi,
      subjectList.english,
      subjectList.bengali,
      subjectList.marathi,
      subjectList.science,
      subjectList.sanskrit,
      subjectList.geography,
      subjectList.spanish,
      subjectList.tamil,
      subjectList.telugu,
      subjectList.kannada,
      subjectList.arabicbidaytularebia,
      subjectList.balbharatikannada,
      subjectList.cocurricular,
      subjectList.evs,
      subjectList.evspart1,
      subjectList.evspart2,
      subjectList.gujarati,
      subjectList.defencestudies,
      subjectList.gulhaafarsi,
      subjectList.history,
      subjectList.historyandcivics,
      subjectList.historyandpoliticalscience,
      subjectList.khelekaresikhe,
      subjectList.khelokarusikhu,
      subjectList.khelukarushiku,
      subjectList.kumarbharatikannada,
      subjectList.marathishikshaksanhita,
      subjectList.mathematics,
      subjectList.playdolearn,
      subjectList.scholarshipenglish,
      subjectList.scholarshipintelligencetest,
      subjectList.scholarshipmarathi,
      subjectList.scholarshipmathematics,
      subjectList.secretarialpracticesp,
      subjectList.selfdevelopment,
      subjectList.urdu,
    ],
  })
  @Expose()
  subject: string;

  @ApiProperty({
    description: "Worksheet grade",
  })
  @Expose()
  grade: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([
    classList.class1,
    classList.class2,
    classList.class3,
    classList.class4,
    classList.class5,
    classList.class6,
    classList.class7,
    classList.class8,
    classList.class9,
    classList.class10,
    classList.class11,
    classList.class12,
  ])
  @IsEnum(classList)
  @ApiProperty({
    description: "Worksheet grade level",
    enum: [
      classList.class1,
      classList.class2,
      classList.class3,
      classList.class4,
      classList.class5,
      classList.class6,
      classList.class7,
      classList.class8,
      classList.class9,
      classList.class10,
      classList.class11,
      classList.class12,
    ],
  })
  @Expose()
  level: string;

  @ApiProperty({
    description: "Worksheet instructions",
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

  @IsString()
  @IsNotEmpty()
  @IsIn([enumOption.yes, enumOption.no])
  @IsEnum(enumOption)
  @ApiProperty({
    type: String,
    description:
      "Configuration to enable/disable hints for the student while using the question set.",
    default: "",
    enum: [enumOption.yes, enumOption.no],
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

  @IsString()
  @IsNotEmpty()
  @IsIn([visibility.private, visibility.public])
  @IsEnum(visibility)
  @ApiProperty({
    type: String,
    description: "Visibility of the question set.",
    default: "",
    enum: [visibility.private, visibility.public],
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

  @IsString()
  @IsNotEmpty()
  @IsIn([source.diksha, source.khanAcademy])
  @IsEnum(source)
  @ApiProperty({
    description: "source of worksheet",
    enum: [source.diksha, source.khanAcademy],
  })
  @Expose()
  source: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  constructor(obj: any) {
    this.worksheetId = obj?.worksheetId ? `${obj.worksheetId}` : "";
    this.name = obj?.name ? `${obj.name}` : "";
    this.state = obj?.state ? `${obj.state}` : "";
    this.subject = obj?.subject ? `${obj.subject}` : "";
    this.grade = obj?.grade ? `${obj.grade}` : "";
    this.level = obj?.level ? `${obj.level}` : "";
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
    this.topic = obj?.topic ? obj.topic : "";
    this.source = obj?.source ? `${obj.source}` : "";
    this.createdAt = obj?.created_at ? `${obj.created_at}` : "";
    this.updatedAt = obj?.updated_at ? `${obj.updated_at}` : "";
  }
}
