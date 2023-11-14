import { AnswerModule } from './../answer/answer.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './survey.entity';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { AnswerService } from './../answer/answer.service';
import { Answer } from 'src/answer/answer.entity';

@Module({
  imports: [AnswerModule, TypeOrmModule.forFeature([Survey, Answer])],
  providers: [SurveyService, AnswerService],
  controllers: [SurveyController],
})
export class SurveyModule {}
