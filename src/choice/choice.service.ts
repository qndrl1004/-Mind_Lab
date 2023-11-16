import { Question } from './../question/question.entity';
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Choice } from './choice.entity';
import { UpdateChoiceInput } from './choice.resolver';

@Injectable()
export class ChoiceService {
  constructor(
    @InjectRepository(Choice)
    private choiceRepository: Repository<Choice>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async getChoices(): Promise<Choice[]> {
    try {
      return await this.choiceRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error while fetching choices');
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
      throw new InternalServerErrorException('Error while fetching choice');
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
      throw new InternalServerErrorException('Error while creating choice');
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
      throw new InternalServerErrorException('Error while updating choice');
    }
  }

  async deleteChoice(id: number): Promise<boolean> {
    try {
      const deleteResult = await this.choiceRepository.delete(id);
      return deleteResult.affected > 0;
    } catch (error) {
      throw new InternalServerErrorException('Error while deleting choice');
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
      throw new InternalServerErrorException(
        'Error while initializing scores for new question',
      );
    }
  }
  async getChoicesBySurveyId(surveyId: number): Promise<Choice[]> {
    try {
      return await this.choiceRepository.find({
        where: { question: { survey: { id: surveyId } } },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error while fetching choices');
    }
  }
}
