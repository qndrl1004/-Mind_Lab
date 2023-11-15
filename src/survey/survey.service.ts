import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from './survey.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
  ) {}

  async getSurveys(): Promise<Survey[]> {
    return this.surveyRepository.find();
  }

  async getSurvey(id: number): Promise<Survey> {
    const survey = await this.surveyRepository.findOne({ where: { id } });

    if (!survey) {
      throw new NotFoundException(`Survey with id ${id} not found`);
    }

    return survey;
  }

  async createSurvey(input: {
    title: string;
    description: string;
  }): Promise<Survey> {
    const { title, description } = input;
    const survey = this.surveyRepository.create({ title, description });
    return this.surveyRepository.save(survey);
  }

  async updateSurvey(
    id: number,
    input: { title: string; description: string },
  ): Promise<Survey> {
    const survey = await this.surveyRepository.findOne({ where: { id } });

    if (!survey) {
      throw new NotFoundException(`Survey with id ${id} not found`);
    }

    survey.title = input.title;
    survey.description = input.description;
    return this.surveyRepository.save(survey);
  }

  async deleteSurvey(id: number): Promise<boolean> {
    const deleteResult = await this.surveyRepository.delete(id);
    return deleteResult.affected > 0;
  }
}
