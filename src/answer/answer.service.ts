import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';
import { Question } from '../question/question.entity';
import { Survey } from '../survey/survey.entity';
import { Choice } from '../choice/choice.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

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
        {
          where: { id: questionId },
        },
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
      console.error('Error while creating/updating answer:', error);
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
      throw new InternalServerErrorException(
        'Error while calculating total score',
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
      throw new InternalServerErrorException(
        'Error while checking survey completion',
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
      throw new InternalServerErrorException(
        'Error while getting question count',
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
        throw new NotFoundException('No completed survey found');
      }

      return answers;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while fetching completed survey',
      );
    }
  }
}
