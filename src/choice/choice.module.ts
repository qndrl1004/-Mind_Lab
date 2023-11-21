import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Choice } from './choice.entity';
import { ChoiceService } from './choice.service';
import { ChoiceResolver } from './choice.resolver';
import { Question } from '../question/question.entity';
import { QuestionService } from '../question/question.service';
import { Survey } from '../survey/survey.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Choice]),
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([Survey]),
  ],
  providers: [ChoiceService, ChoiceResolver, QuestionService],
})
export class ChoiceModule {}
