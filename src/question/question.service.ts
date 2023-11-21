import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { Survey } from 'src/survey/survey.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionService {
  private readonly logger = new Logger(QuestionService.name);

  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
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

  async getQuestions(): Promise<Question[]> {
    try {
      return await this.questionRepository.find({
        relations: ['choices', 'survey'],
      });
    } catch (error) {
      this.handleQueryError('getQuestions', 0, error);
    }
  }

  async getQuestion(id: number): Promise<Question> {
    try {
      const question = await this.questionRepository.findOne({
        where: { id },
        relations: ['choices', 'survey'],
      });

      if (!question) {
        throw new NotFoundException(`Question with id ${id} not found`);
      }

      return question;
    } catch (error) {
      this.handleQueryError('getQuestion', id, error);
    }
  }

  async createQuestion(input: {
    content: string;
    surveyId: number;
  }): Promise<Question> {
    try {
      const { content, surveyId } = input;

      const survey = await this.surveyRepository.findOne({
        where: { id: surveyId },
      });

      if (!survey) {
        throw new NotFoundException(`Survey with id ${surveyId} not found`);
      }

      const question = this.questionRepository.create({ content, survey });

      return await this.questionRepository.save(question);
    } catch (error) {
      this.handleQueryError('createQuestion', 0, error);
    }
  }

  async updateQuestion(input: {
    id: number;
    content: string;
  }): Promise<Question> {
    try {
      const { id, content } = input;
      const question = await this.questionRepository.findOne({
        where: { id },
        relations: ['choices', 'survey'],
      });

      if (!question) {
        throw new NotFoundException(`Question with id ${id} not found`);
      }

      question.content = content;
      return await this.questionRepository.save(question);
    } catch (error) {
      this.handleQueryError('updateQuestion', input.id, error);
    }
  }

  async deleteQuestion(id: number): Promise<boolean> {
    try {
      const deleteResult = await this.questionRepository.delete(id);
      return deleteResult.affected > 0;
    } catch (error) {
      this.handleQueryError('deleteQuestion', id, error);
    }
  }
}
