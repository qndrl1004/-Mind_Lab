import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Survey } from './survey.entity';
import { SurveyInput } from './survey.input';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SurveyService {
  private readonly logger = new Logger(SurveyService.name);

  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
  ) {}

  private handleQueryError(
    methodName: string,
    id: number,
    error: Error,
  ): never {
    this.logger.error(`Error in ${methodName}: ${error.message}`);
    throw new Error(
      `Failed to fetch ${methodName.toLowerCase()} with id ${id}`,
    );
  }

  async getAllSurveys(): Promise<Survey[]> {
    try {
      return await this.surveyRepository.find({
        relations: ['questions', 'questions.choices'],
      });
    } catch (error) {
      this.handleQueryError('getAllSurveys', 0, error);
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
      this.handleQueryError('getSurvey', id, error);
    }
  }

  async createSurvey(data: SurveyInput): Promise<Survey> {
    try {
      const survey = this.surveyRepository.create(data);
      return await this.surveyRepository.save(survey);
    } catch (error) {
      this.handleQueryError('createSurvey', 0, error);
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
      this.handleQueryError('updateSurvey', id, error);
    }
  }

  async deleteSurvey(id: number): Promise<boolean> {
    try {
      const deleteResult = await this.surveyRepository.delete(id);
      return deleteResult.affected > 0;
    } catch (error) {
      this.handleQueryError('deleteSurvey', id, error);
    }
  }
}
