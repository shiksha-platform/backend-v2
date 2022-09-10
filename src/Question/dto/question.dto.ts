import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { StudentDto } from "src/student/dto/student.dto";

export class QuestionDto {
  @Expose()
  examQuestionId: string;

  @ApiProperty({
    description:
      "Body contains the text, graphics, media objects and interactions that describe the question’s content.",
  })
  @Expose()
  body: string;

  @ApiProperty({
    description:
      "Instructions on how to understand, attempt or how the question will be evaluated.",
  })
  @Expose()
  instructions: string;

  @ApiProperty({
    description: "Feedback shown to the students after response processing.",
  })
  @Expose()
  feedback: [string];

  @ApiProperty({
    description:
      "Hints are shown to the students after response processing or when the student requests for hints.",
  })
  @Expose()
  hints: [string];

  @ApiProperty({
    description: "options of question.",
  })
  @Expose()
  options: [string];

  @ApiProperty({
    description: "List of media used in the question",
  })
  @Expose()
  media: [string];

  @ApiProperty({
    description:
      "Information about answer to the question, when it is correct and optionally, how it is scored.",
  })
  @Expose()
  responseDeclaration: [string];

  @ApiProperty({
    description:
      "Information about the outcome variables of the question, i.e the values that are output of a question session.",
  })
  @Expose()
  outcomeDeclaration: [string];

  @ApiProperty({
    description:
      "Declaration of template variables that are to used for the purposes of cloning questions, i.e. auto-generating different sets of values for variables in the question.",
  })
  @Expose()
  templateDeclaration: [string];

  @ApiProperty({
    description:
      "One or more template rules to assign values to the template variables.",
  })
  @Expose()
  templateProcessing: [string];

  @ApiProperty({
    description:
      "Rules to assign values to outcome variables based on the student's reponses.",
  })
  @Expose()
  responseProcessing: [string];

  @ApiProperty({
    description: "Cognitive processes involved to answer the question.",
  })
  @Expose()
  bloomsLevel: [string];

  @ApiProperty({
    description: "Difficulty level of the question.",
  })
  @Expose()
  qlevel: [string];

  @ApiProperty({
    description: "Purpose served by the question.",
  })
  @Expose()
  purpose: string;

  @ApiProperty({
    description: "Expected time for one attempt of the question.",
  })
  @Expose()
  expectedDuration: number;

  @ApiProperty({
    description: "Maximum score that can be awarded for the question.",
  })
  @Expose()
  maxScore: number;

  @ApiProperty({
    description:
      "One of the standard question types - mcq, mtf, ftb, mmcq, essay, short answers, programming, other. this can be auto-derived based on the interactions used in the question.",
  })
  @Expose()
  type: string;

  @ApiProperty({
    description:
      "If the question is visible for all or only for those who created it and/or for some specific systems or use cases.",
  })
  @Expose()
  visibility: string;

  @ApiProperty({
    description:
      "Set to true if question data has template variables and template processing, else it is set to false.",
  })
  @Expose()
  isTemplate: boolean;

  @ApiProperty({
    description: "List of interactions present in the question.",
  })
  @Expose()
  interactions: [string];

  @ApiProperty({
    description: "true, if question data has solutions, else, set to false",
  })
  @Expose()
  solutionAvailable: boolean;

  @ApiProperty({
    description:
      "One of the values: responseProcessing (if question has inbuild response processing), offline (if scoring will be done offline and/or manually) or external (if an external system does the evaluation and submit the score).",
  })
  @Expose()
  scoringMode: string;

  @ApiProperty({
    description:
      "Version of the QuML specification using which the question is created.",
  })
  @Expose()
  qumlVersion: string;

  @ApiProperty({
    description:
      "Total cumulative time spent, in milliseconds, on the question by all users.",
  })
  @Expose()
  totalTimeSpent: number;

  @ApiProperty({
    description: "Average time spent per attempt, in milliseconds.",
  })
  @Expose()
  avgTimeSpent: number;

  @ApiProperty({
    description: "total number of attempts.",
  })
  @Expose()
  numAttempts: number;

  @ApiProperty({
    description: "Number of attempts where the user response is correct.",
  })
  @Expose()
  numCorrectAttempts: number;

  @ApiProperty({
    description: "Number of attempts where the user response is in-correct.",
  })
  @Expose()
  numInCorrectAttempts: number;

  @ApiProperty({
    description:
      "Total number of attempts where the user did not give a response.",
  })
  @Expose()
  numSkips: number;

  @ApiProperty({
    description: "Average rating of the question.",
  })
  @Expose()
  avgRating: number;

  @ApiProperty({
    description: "Total number of ratings given for the question.",
  })
  @Expose()
  totalRatings: number;

  @ApiProperty({})
  @Expose()
  topic: string;

  @ApiProperty({})
  @Expose()
  subject: string;

  @ApiProperty({})
  @Expose()
  class: string;

  @ApiProperty({})
  @Expose()
  questionId: string;

  @ApiProperty({})
  @Expose()
  language: string;

  @ApiProperty({})
  @Expose()
  compatibilityLevel: string;

  @ApiProperty({})
  @Expose()
  learningOutcome: string;

  @ApiProperty({})
  @Expose()
  source: string;

  @ApiProperty({})
  @Expose()
  answer: string;

  constructor(obj: QuestionDto) {
    Object.assign(this, obj);
  }
}
