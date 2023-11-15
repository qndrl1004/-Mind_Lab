import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Choice } from './choice.entity';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateChoiceInput {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;
}

@Injectable()
export class ChoiceService {
  constructor(
    @InjectRepository(Choice)
    private choiceRepository: Repository<Choice>,
  ) {}

  async getChoices(): Promise<Choice[]> {
    return this.choiceRepository.find();
  }

  async getChoice(id: number): Promise<Choice> {
    return this.choiceRepository.findOne({ where: { id } });
  }

  async createChoice(input: {
    content: string;
    questionId: number;
  }): Promise<Choice> {
    const { content, questionId } = input;
    const choice = this.choiceRepository.create({
      content,
      questionId,
    } as DeepPartial<Choice>);
    return this.choiceRepository.save(choice);
  }

  async updateChoice(input: UpdateChoiceInput): Promise<Choice> {
    const { id, content } = input;
    const choice = await this.choiceRepository.findOne({ where: { id } });

    if (!choice) {
      throw new NotFoundException(`Choice with id ${id} not found`);
    }

    choice.content = content;
    return this.choiceRepository.save(choice);
  }

  async deleteChoice(id: number): Promise<boolean> {
    const deleteResult = await this.choiceRepository.delete(id);
    return deleteResult.affected > 0;
  }
}
