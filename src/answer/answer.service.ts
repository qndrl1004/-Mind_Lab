import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async createAnswer(
    questionId: number,
    choiceId: number,
    score: number,
  ): Promise<Answer> {
    const answer = this.answerRepository.create({
      question: { id: questionId },
      choice: { id: choiceId },
      score,
    });
    return this.answerRepository.save(answer);
  }

  async getAnswerById(id: number): Promise<Answer> {
    try {
      return await this.answerRepository.findOne({ where: { id } });
    } catch (error) {
      throw new NotFoundException(
        `Error getting answer with id ${id}: ${error.message}`,
      );
    }
  }

  async getAllAnswers(): Promise<Answer[]> {
    return this.answerRepository.find({ relations: ['question', 'choice'] });
  }

  async deleteAnswer(id: number): Promise<boolean> {
    const deleteResult = await this.answerRepository.delete(id);
    return deleteResult.affected > 0;
  }
}
