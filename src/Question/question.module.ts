import { CacheModule, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { QuestionController } from "./question.controller";
import {
  DikshaQuestionToken,
  QumlQuestionService,
} from "src/adapters/diksha/quml.adapter";
import {
  KhanAcademyQuestionService,
  KhanAcademyQuestionToken,
} from "src/adapters/khanAcademy/khanAcademy.adapter";
import {
  HasuraQuestionToken,
  QuestionService,
} from "src/adapters/hasura/question.adapter";
const ttl = process.env.TTL as never;
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: ttl,
    }),
  ],
  controllers: [QuestionController],
  providers: [
    QumlQuestionService,
    KhanAcademyQuestionService,
    { provide: DikshaQuestionToken, useClass: QumlQuestionService },
    { provide: KhanAcademyQuestionToken, useClass: KhanAcademyQuestionService },
    { provide: HasuraQuestionToken, useClass: QuestionService },
  ],
})
export class QuestionModule {}
