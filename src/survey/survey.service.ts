import {
  Injectable,
  NotFoundException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from './survey.entity';
import { SurveyInput } from './survey.resolver';

@Injectable()
export class SurveyService {
  private readonly logger = new Logger(SurveyService.name);

  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
  ) {}

  async getAllSurveys(): Promise<Survey[]> {
    try {
      return await this.surveyRepository.find({
        relations: ['questions', 'questions.choices'],
      });
    } catch (error) {
      throw new InternalServerErrorException('Error while fetching surveys');
    }
  }

  async getSurvey(id: number): Promise<Survey> {
    try {
      const survey = await this.surveyRepository.findOne({ where: { id } });

      if (!survey) {
        throw new NotFoundException(`Survey with id ${id} not found`);
      }

      return survey;
    } catch (error) {
      this.logger.error(`Error in getSurvey: ${error.message}`);
      throw new Error('Failed to fetch survey');
    }
  }

  async createSurvey(data: SurveyInput): Promise<Survey> {
    try {
      const survey = this.surveyRepository.create(data);
      return await this.surveyRepository.save(survey);
    } catch (error) {
      this.logger.error(`Error in createSurvey: ${error.message}`);
      throw new Error('Failed to create survey');
    }
  }

  async updateSurvey(
    id: number,
    input: { title: string; description: string },
  ): Promise<Survey> {
    try {
      const survey = await this.surveyRepository.findOne({ where: { id } });

      if (!survey) {
        throw new NotFoundException(`Survey with id ${id} not found`);
      }

      survey.title = input.title;
      survey.description = input.description;
      return await this.surveyRepository.save(survey);
    } catch (error) {
      this.logger.error(`Error in updateSurvey: ${error.message}`);
      throw new Error('Failed to update survey');
    }
  }

  async deleteSurvey(id: number): Promise<boolean> {
    try {
      const deleteResult = await this.surveyRepository.delete(id);
      return deleteResult.affected > 0;
    } catch (error) {
      this.logger.error(`Error in deleteSurvey: ${error.message}`);
      throw new Error('Failed to delete survey');
    }
  }
}
