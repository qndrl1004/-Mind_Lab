import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async createQuestion(content: string): Promise<Question> {
    const question = this.questionRepository.create({ content });
    return await this.questionRepository.save(question);
  }

  async findAllQuestions(): Promise<Question[]> {
    return await this.questionRepository.find();
  }

  async findQuestionById(id: number): Promise<Question | undefined> {
    const options: FindOneOptions<Question> = {
      where: { id },
    };
    return await this.questionRepository.findOne(options);
  }

  async updateQuestion(
    id: number,
    content: string,
  ): Promise<Question | undefined> {
    await this.questionRepository.update(id, { content });
    return await this.findQuestionById(id);
  }

  async deleteQuestion(id: number): Promise<void> {
    await this.questionRepository.delete(id);
  }
}
