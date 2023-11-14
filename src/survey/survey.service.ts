import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from './survey.entity';
import { FindOneOptions } from 'typeorm';
import { AnswerService } from 'src/answer/answer.service';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    private readonly answerService: AnswerService,
  ) {}

  async completeSurvey(
    answers: { questionId: number; choiceId: number; score: number }[],
  ): Promise<void> {
    for (const answer of answers) {
      await this.answerService.createAnswer(
        answer.questionId,
        answer.choiceId,
        answer.score,
      );
    }
  }

  async getCompletedSurveys(): Promise<Survey[]> {
    return await this.surveyRepository.find();
  }

  async createSurvey(title: string, description: string): Promise<Survey> {
    const survey = this.surveyRepository.create({ title, description });
    return await this.surveyRepository.save(survey);
  }

  async findAllSurveys(): Promise<Survey[]> {
    return await this.surveyRepository.find();
  }

  async findSurveyById(id: number): Promise<Survey | undefined> {
    const options: FindOneOptions<Survey> = {
      where: { id },
    };

    return await this.surveyRepository.findOne(options);
  }

  async updateSurvey(
    id: number,
    title: string,
    description: string,
  ): Promise<Survey | undefined> {
    await this.surveyRepository.update(id, { title, description });
    return await this.findSurveyById(id);
  }

  async deleteSurvey(id: number): Promise<void> {
    await this.surveyRepository.delete(id);
  }
}
