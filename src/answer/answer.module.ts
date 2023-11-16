import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';
import { Choice } from '../choice/choice.entity';
import { ChoiceService } from '../choice/choice.service';
import { Question } from '../question/question.entity';
import { SurveyService } from '../survey/survey.service';
import { Survey } from '../survey/survey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, Choice, Question, Survey])],
  providers: [AnswerService, AnswerResolver, ChoiceService, SurveyService],
})
export class AnswerModule {}
