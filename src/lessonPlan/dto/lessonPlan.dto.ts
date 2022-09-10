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
    Object.assign(this, obj);
  }
}
