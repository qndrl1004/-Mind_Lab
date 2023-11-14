import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { Survey } from './survey.entity';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post('complete')
  async completeSurvey(
    @Body() answers: { questionId: number; choiceId: number; score: number }[],
  ): Promise<void> {
    await this.surveyService.completeSurvey(answers);
  }

  @Get('completed')
  async getCompletedSurveys(): Promise<Survey[]> {
    return await this.surveyService.getCompletedSurveys();
  }

  @Post()
  createSurvey(
    @Body() surveyData: { title: string; description: string },
  ): Promise<Survey> {
    return this.surveyService.createSurvey(
      surveyData.title,
      surveyData.description,
    );
  }

  @Get()
  findAllSurveys(): Promise<Survey[]> {
    return this.surveyService.findAllSurveys();
  }

  @Get(':id')
  findSurveyById(@Param('id') id: string): Promise<Survey | undefined> {
    return this.surveyService.findSurveyById(+id);
  }

  @Put(':id')
  updateSurvey(
    @Param('id') id: string,
    @Body() surveyData: { title: string; description: string },
  ): Promise<Survey | undefined> {
    return this.surveyService.updateSurvey(
      +id,
      surveyData.title,
      surveyData.description,
    );
  }

  @Delete(':id')
  deleteSurvey(@Param('id') id: string): Promise<void> {
    return this.surveyService.deleteSurvey(+id);
  }
}
