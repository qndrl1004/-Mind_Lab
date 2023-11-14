import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Choice } from './choice.entity';

@Injectable()
export class ChoiceService {
  constructor(
    @InjectRepository(Choice)
    private readonly choiceRepository: Repository<Choice>,
  ) {}

  async createChoice(content: string, questionId: number): Promise<Choice> {
    const choice = this.choiceRepository.create({ content, questionId });
    return await this.choiceRepository.save(choice);
  }

  async findAllChoices(): Promise<Choice[]> {
    return await this.choiceRepository.find();
  }

  async findChoiceById(id: number): Promise<Choice | undefined> {
    const options: FindOneOptions<Choice> = {
      where: { id },
    };
    return await this.choiceRepository.findOne(options);
  }

  async updateChoice(id: number, content: string): Promise<Choice | undefined> {
    await this.choiceRepository.update(id, { content });
    return await this.findChoiceById(id);
  }

  async deleteChoice(id: number): Promise<void> {
    await this.choiceRepository.delete(id);
  }
}
