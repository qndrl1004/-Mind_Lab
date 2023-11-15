import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  providers: [QuestionService, QuestionResolver],
})
export class QuestionModule {}
