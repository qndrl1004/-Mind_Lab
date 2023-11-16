import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Choice } from './choice.entity';
import { ChoiceService } from './choice.service';
import { ChoiceResolver } from './choice.resolver';
import { Question } from '../question/question.entity';
import { QuestionService } from '../question/question.service';
import { Survey } from 'src/survey/survey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Choice, Question, Survey])],
  providers: [ChoiceService, ChoiceResolver, QuestionService],
})
export class ChoiceModule {}
