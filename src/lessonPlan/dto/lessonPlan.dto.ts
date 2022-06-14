import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class LessonPlanDto {
  @Expose()
  contentId: string;

  @ApiProperty({})
  @Expose()
  name: string;

  @ApiProperty({})
  @Expose()
  code: string;

  @ApiProperty({})
  @Expose()
  status: string;

  @ApiProperty({})
  @Expose()
  channel: string;

  @ApiProperty({})
  @Expose()
  mediaType: string;

  @ApiProperty({})
  @Expose()
  compatibilityLevel: string;

  @ApiProperty({})
  @Expose()
  audience: [string];

  @ApiProperty({})
  @Expose()
  posterImage: string;

  @ApiProperty({})
  @Expose()
  duration: string;

  @ApiProperty({})
  @Expose()
  downloadUrl: string;

  @ApiProperty({})
  @Expose()
  previewUrl: string;

  @ApiProperty({})
  @Expose()
  author: string;

  @ApiProperty({})
  @Expose()
  languageCode: [string];

  @ApiProperty({})
  @Expose()
  language: [string];

  @ApiProperty({})
  @Expose()
  ageGroup: [string];

  @ApiProperty({})
  @Expose()
  contentType: string;

  @ApiProperty({})
  @Expose()
  category: [string];

  @ApiProperty({})
  @Expose()
  teachingMode: string;

  @ApiProperty({})
  @Expose()
  skills: [string];

  @ApiProperty({})
  @Expose()
  keywords: [string];

  @ApiProperty({})
  @Expose()
  description: string;

  @ApiProperty({})
  @Expose()
  instructions: string;

  @ApiProperty({})
  @Expose()
  body: string;

  @ApiProperty({})
  @Expose()
  learningObjective: [string];

  @ApiProperty({})
  @Expose()
  creator: string;

  @ApiProperty({})
  @Expose()
  reviewer: string;

  @ApiProperty({})
  @Expose()
  lastSubmittedBy: string;

  @ApiProperty({})
  @Expose()
  lastSubmittedOn: string;

  @ApiProperty({})
  @Expose()
  lastPublishedBy: string;

  @ApiProperty({})
  @Expose()
  lastPublishedOn: string;

  @ApiProperty({})
  @Expose()
  subject: [string];

  @ApiProperty({})
  @Expose()
  questionCategories: [string];

  @ApiProperty({})
  @Expose()
  medium: [string];

  @ApiProperty({})
  @Expose()
  gradeLevel: [string];

  @ApiProperty({})
  @Expose()
  topic: [string];

  @ApiProperty({})
  @Expose()
  subjectCodes: [string];

  @ApiProperty({})
  @Expose()
  difficultyLevel: string;

  @ApiProperty({})
  @Expose()
  board: string;

  @ApiProperty({})
  @Expose()
  primaryCategory: string;

  @ApiProperty({})
  @Expose()
  accessibility: [string];

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdBy: string;

  @Expose()
  updatedBy: string;
  constructor(obj: any) {
    this.contentId = obj?.osid ? `${obj.osid}` : "";
    this.name = `${obj.name}`;
    this.code = obj?.code ? `${obj.code}` : "";
    this.status = obj?.status ? `${obj.status}` : "";
    this.channel = obj?.channel ? `${obj.channel}` : "";
    this.mediaType = obj?.mediaType ? `${obj.mediaType}` : "";
    this.compatibilityLevel = obj?.compatibilityLevel
      ? `${obj.compatibilityLevel}`
      : "";
    this.audience = obj?.audience ? obj.audience : [];
    this.posterImage = obj?.posterImage ? `${obj.posterImage}` : "";
    this.duration = obj?.duration ? `${obj.duration}` : "";
    this.downloadUrl = obj?.downloadUrl ? `${obj.downloadUrl}` : "";
    this.previewUrl = obj?.previewUrl ? `${obj.previewUrl}` : "";
    this.author = obj?.author ? `${obj.author}` : "";
    this.languageCode = obj?.languageCode ? obj.languageCode : [];
    this.language = obj?.language ? obj.language : [];
    this.ageGroup = obj?.ageGroup ? obj.ageGroup : [];
    this.contentType = obj?.contentType ? `${obj.contentType}` : "";
    this.category = obj?.category ? obj.category : [];
    this.teachingMode = obj?.teachingMode ? `${obj.teachingMode}` : "";
    this.skills = obj?.skills ? obj.skills : [];
    this.keywords = obj?.keywords ? obj.keywords : [];
    this.description = obj?.osid ? `${obj.osid}` : "";
    this.instructions = obj?.osid ? `${obj.osid}` : "";
    this.body = obj?.body ? obj.body : "";
    this.learningObjective = obj?.learningObjective
      ? obj.learningObjective
      : [];
    this.creator = obj?.creator ? `${obj.creator}` : "";
    this.reviewer = obj?.reviewer ? `${obj.reviewer}` : "";
    this.lastSubmittedBy = obj?.lastSubmittedBy ? `${obj.lastSubmittedBy}` : "";
    this.lastSubmittedOn = obj?.lastSubmittedOn ? `${obj.lastSubmittedOn}` : "";
    this.lastPublishedBy = obj?.lastPublishedBy ? `${obj.lastPublishedBy}` : "";
    this.lastPublishedOn = obj?.astPublishedOn ? `${obj.astPublishedOn}` : "";
    this.subject = obj?.subject ? obj.subject : [];
    this.questionCategories = obj?.questionCategories
      ? obj.questionCategories
      : [];
    this.medium = obj?.medium ? obj.medium : [];
    this.gradeLevel = obj?.gradeLevel ? obj.gradeLevel : [];
    this.topic = obj?.topic ? obj.topic : [];
    this.subjectCodes = obj?.subjectCodes ? obj.subjectCodes : [];
    this.difficultyLevel = obj?.difficultyLevel ? `${obj.difficultyLevel}` : "";
    this.board = obj?.board ? `${obj.board}` : "";
    this.primaryCategory = obj?.primaryCategory ? `${obj.primaryCategory}` : "";
    this.accessibility = obj?.accessibility ? obj.accessibility : [];
    this.createdAt = obj?.osCreatedAt ? `${obj.osCreatedAt}` : "";
    this.updatedAt = obj?.osUpdatedAt ? `${obj.osUpdatedAt}` : "";
    this.createdBy = obj?.osCreatedBy ? `${obj.osCreatedBy}` : "";
    this.updatedBy = obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "";
  }
}
