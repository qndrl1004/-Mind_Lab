import { Module } from '@nestjs/common';
import { Question } from './question.entity';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { Survey } from 'src/survey/survey.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([Survey]),
  ],
  providers: [QuestionService, QuestionResolver],
})
export class QuestionModule {}
