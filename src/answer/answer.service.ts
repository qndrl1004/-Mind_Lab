import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';
import { Question } from '../question/question.entity';
import { Survey } from '../survey/survey.entity';
import { Choice } from '../choice/choice.entity';

@Injectable()
export class AnswerService {
  private readonly logger = new Logger(AnswerService.name);

  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  private handleError(method: string, errorMessage: string, error: any): never {
    this.logger.error(`${method} Error: ${errorMessage}`, error.stack);

    if (error instanceof NotFoundException) {
      throw error;
    }

    throw new InternalServerErrorException(errorMessage);
  }

  async createOrUpdateAnswer(
    choiceId: number,
    questionId: number,
    surveyId: number,
  ): Promise<Answer> {
    try {
      const choice = await this.answerRepository.manager.findOneOrFail(Choice, {
        where: { id: choiceId },
      });

      const question = await this.answerRepository.manager.findOneOrFail(
        Question,
        { where: { id: questionId } },
      );

      const survey = await this.answerRepository.manager.findOneOrFail(Survey, {
        where: { id: surveyId },
      });

      const answer = this.answerRepository.create({
        choice,
        question,
        survey,
      });

      return await this.answerRepository.save(answer);
    } catch (error) {
      this.handleError(
        'createOrUpdateAnswer',
        'Error while creating/updating answer',
        error,
      );
    }
  }

  async getSurveyTotalScore(surveyId: number): Promise<number> {
    try {
      const answers = await this.answerRepository.find({
        where: { survey: { id: surveyId } },
        relations: ['choice'],
      });

      const totalScore = answers.reduce(
        (acc, answer) => acc + answer.totalScore,
        0,
      );

      return totalScore;
    } catch (error) {
      this.handleError(
        'getSurveyTotalScore',
        'Error while calculating total score',
        error,
      );
    }
  }

  async isSurveyCompleted(surveyId: number): Promise<boolean> {
    try {
      const questionCount = await this.getQuestionCount(surveyId);

      const count = await this.answerRepository.count({
        where: { survey: { id: surveyId } },
      });

      return count === questionCount;
    } catch (error) {
      this.handleError(
        'isSurveyCompleted',
        'Error while checking survey completion',
        error,
      );
    }
  }

  private async getQuestionCount(surveyId: number): Promise<number> {
    try {
      const questionRepository =
        this.answerRepository.manager.getRepository(Question);

      const questionCount = await questionRepository.count({
        where: { survey: { id: surveyId } },
      });

      return questionCount;
    } catch (error) {
      this.handleError(
        'getQuestionCount',
        'Error while getting question count',
        error,
      );
    }
  }

  async getCompletedSurvey(surveyId: number): Promise<Answer[]> {
    try {
      const answers = await this.answerRepository.find({
        where: { survey: { id: surveyId } },
        relations: ['choice', 'question', 'survey'],
      });

      if (!answers || answers.length === 0) {
        this.logger.warn(`No completed survey found for surveyId: ${surveyId}`);
        throw new NotFoundException('No completed survey found');
      }

      return answers;
    } catch (error) {
      this.handleError(
        'getCompletedSurvey',
        'Error while fetching completed survey',
        error,
      );
    }
  }
}
