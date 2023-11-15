import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './survey.entity';
import { SurveyService } from './survey.service';
import { SurveyResolver } from './survey.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Survey])],
  providers: [SurveyService, SurveyResolver],
})
export class SurveyModule {}
