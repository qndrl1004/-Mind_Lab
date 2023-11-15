import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async getQuestions(): Promise<Question[]> {
    return this.questionRepository.find({ relations: ['choices'] });
  }

  async getQuestion(id: number): Promise<Question> {
    const question = await this.questionRepository.findOne({ where: { id } });

    if (!question) {
      throw new NotFoundException(`Question with id ${id} not found`);
    }

    return question;
  }

  async createQuestion(input: { content: string }): Promise<Question> {
    const { content } = input;
    const question = this.questionRepository.create({ content });
    return this.questionRepository.save(question);
  }

  async updateQuestion(input: {
    id: number;
    content: string;
  }): Promise<Question> {
    const { id, content } = input;
    const question = await this.questionRepository.findOne({ where: { id } });

    if (!question) {
      throw new NotFoundException(`Question with id ${id} not found`);
    }

    question.content = content;
    return this.questionRepository.save(question);
  }

  async deleteQuestion(id: number): Promise<boolean> {
    const deleteResult = await this.questionRepository.delete(id);
    return deleteResult.affected > 0;
  }
}
