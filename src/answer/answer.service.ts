import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async createOrUpdateAnswer(
    choiceId: number,
    totalScore: number,
    questionId: number,
    surveyId: number,
  ): Promise<Answer> {
    try {
      const answer = this.answerRepository.create({
        choiceId,
        totalScore,
        questionId,
        surveyId,
      });

      return await this.answerRepository.save(answer);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while creating/updating answer',
      );
    }
  }

  async getSurveyTotalScore(surveyId: number): Promise<number> {
    try {
      const answers = await this.answerRepository.find({
        where: { surveyId },
        relations: ['choice'], // Update the relation based on your entity structure
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
      const count = await this.answerRepository.count({
        where: { surveyId },
      });

      // 전체 문항 수와 답변된 문항 수가 일치하면 완료된 것으로 간주
      const totalQuestions = 10; // 예시로 문항 수를 10으로 가정
      return count === totalQuestions;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error while checking survey completion',
      );
    }
  }

  async getCompletedSurvey(surveyId: number): Promise<Answer[]> {
    try {
      const answers = await this.answerRepository.find({
        where: { surveyId },
        relations: ['choice', 'question'],
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
