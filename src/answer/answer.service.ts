import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Answer } from './answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async createAnswer(
    questionId: number,
    choiceId: number,
    score: number,
  ): Promise<Answer> {
    const question = { id: questionId };
    const choice = { id: choiceId };
    const answer = this.answerRepository.create({ question, choice, score });
    return await this.answerRepository.save(answer);
  }

  async findAllAnswers(): Promise<Answer[]> {
    return await this.answerRepository.find();
  }

  async findAnswerById(id: number): Promise<Answer | undefined> {
    const options: FindOneOptions<Answer> = {
      where: { id },
    };

    return await this.answerRepository.findOne(options);
  }

  async updateAnswer(id: number, score: number): Promise<Answer | undefined> {
    await this.answerRepository.update(id, { score });
    return await this.findAnswerById(id);
  }

  async deleteAnswer(id: number): Promise<void> {
    await this.answerRepository.delete(id);
  }
}
