import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { Choice } from './choice.entity';
import { UpdateChoiceInput } from './choice.input';
import { Question } from './../question/question.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChoiceService {
  private readonly logger = new Logger(ChoiceService.name);

  constructor(
    @InjectRepository(Choice)
    private choiceRepository: Repository<Choice>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  private logAndThrowError(message: string, error: any): never {
    const errorMessage = `${message}: ${error.message}`;
    this.logger.error(errorMessage, error.stack);
    throw new InternalServerErrorException(errorMessage);
  }

  private handleQueryError(
    methodName: string,
    id: number,
    error: Error,
  ): never {
    this.logAndThrowError(`Error in ${methodName}`, error);
  }

  async getChoices(): Promise<Choice[]> {
    try {
      return await this.choiceRepository.find();
    } catch (error) {
      this.logAndThrowError('Error while fetching choices', error);
    }
  }

  async getChoice(id: number): Promise<Choice> {
    try {
      const choice = await this.choiceRepository.findOne({ where: { id } });
      if (!choice) {
        throw new NotFoundException(`Choice with id ${id} not found`);
      }
      return choice;
    } catch (error) {
      this.handleQueryError('getChoice', id, error);
    }
  }

  async createChoice(input: {
    content: string;
    questionId: number;
  }): Promise<Choice> {
    try {
      const { content, questionId } = input;

      const question = await this.questionRepository.findOne({
        where: { id: questionId },
        relations: ['choices'],
      });

      if (!question) {
        throw new NotFoundException(`Question with id ${questionId} not found`);
      }

      const choice = this.choiceRepository.create({
        content,
        question,
      } as DeepPartial<Choice>);

      return await this.choiceRepository.save(choice);
    } catch (error) {
      this.logAndThrowError('Error while creating choice', error);
    }
  }

  async updateChoice(input: UpdateChoiceInput): Promise<Choice> {
    try {
      const { id, content } = input;
      const choice = await this.choiceRepository.findOne({ where: { id } });

      if (!choice) {
        throw new NotFoundException(`Choice with id ${id} not found`);
      }

      choice.content = content;
      return await this.choiceRepository.save(choice);
    } catch (error) {
      this.logAndThrowError('Error while updating choice', error);
    }
  }

  async deleteChoice(id: number): Promise<boolean> {
    try {
      const deleteResult = await this.choiceRepository.delete(id);
      return deleteResult.affected > 0;
    } catch (error) {
      this.logAndThrowError('Error while deleting choice', error);
    }
  }

  async initializeScoresForNewQuestion(questionId: number): Promise<void> {
    try {
      const choices = await this.choiceRepository.find({
        where: { question: { id: questionId } },
      });

      if (choices && choices.length > 0) {
        choices.forEach((choice, index) => {
          choice.score = index;
        });

        await this.choiceRepository.save(choices);
      }
    } catch (error) {
      this.logAndThrowError(
        'Error while initializing scores for new question',
        error,
      );
    }
  }

  async getChoicesBySurveyId(surveyId: number): Promise<Choice[]> {
    try {
      return await this.choiceRepository.find({
        where: { question: { survey: { id: surveyId } } },
      });
    } catch (error) {
      this.logAndThrowError('Error while fetching choices', error);
    }
  }
}
