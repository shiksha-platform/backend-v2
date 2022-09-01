import { Expose } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsIn, IsNotEmpty, IsString } from "class-validator";
import {
  source,
  Status,
  subjectList,
  trackAssessmentType,
} from "../enums/trackAssessment.enum";

export class TrackAssessmentDto {
  @Expose()
  trackAssessmentId: string;

  @ApiProperty({
    description: "JSON string of filters selected for the assessment ",
  })
  @Expose()
  filter: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([trackAssessmentType.oral, trackAssessmentType.written])
  @IsEnum(trackAssessmentType)
  @ApiProperty({
    description: "Assessment type, spot assessment or exam",
    enum: [trackAssessmentType.oral, trackAssessmentType.written],
  })
  @Expose()
  type: string;

  @ApiPropertyOptional({
    description: "Array of question Id's against the assessment is given",
  })
  @Expose()
  questions: [string];

  @IsString()
  @IsNotEmpty()
  @IsIn([source.diksha, source.khanAcademy])
  @IsEnum(source)
  @ApiPropertyOptional({
    description: "Assessment questions source",
    enum: [source.diksha, source.khanAcademy],
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
    description: "subject",
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
    this.trackAssessmentId = obj?.trackAssessmentId
      ? `${obj.trackAssessmentId}`
      : "";
    this.filter = obj?.filter ? `${obj.filter}` : "";
    this.type = obj?.type ? `${obj.type}` : "";
    this.questions = obj?.questions ? obj.questions : "";
    this.source = obj?.source ? `${obj.source}` : "";
    this.answersheet = obj?.answersheet ? `${obj.answersheet}` : "";
    this.score = obj?.score ? `${obj.score}` : "";
    this.totalScore = obj?.totalScore ? `${obj.totalScore}` : "";
    this.studentId = obj?.studentId ? `${obj.studentId}` : "";
    this.teacherId = obj?.teacherId ? `${obj.teacherId}` : "";
    this.groupId = obj?.groupId ? `${obj.groupId}` : "";
    this.subject = obj?.subject ? `${obj.subject}` : "";
    this.date = obj?.date ? `${obj.date}` : "";
    this.status = obj?.status ? `${obj.status}` : "";
    this.createdAt = obj?.created_at ? `${obj.created_at}` : "";
    this.updatedAt = obj?.updated_at ? `${obj.updated_at}` : "";
  }
}
