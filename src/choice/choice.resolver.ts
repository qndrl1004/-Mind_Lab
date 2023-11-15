import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  InputType,
  Field,
} from '@nestjs/graphql';
import { ChoiceService } from './choice.service';
import { Choice } from './choice.entity';

@InputType()
class CreateChoiceInput {
  @Field()
  content: string;

  @Field(() => Int)
  questionId: number;
}

@InputType()
class UpdateChoiceInput {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;
}

@Resolver(() => Choice)
export class ChoiceResolver {
  constructor(private readonly choiceService: ChoiceService) {}

  @Query(() => [Choice])
  async getChoices(): Promise<Choice[]> {
    return this.choiceService.getChoices();
  }

  @Query(() => Choice)
  async getChoice(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Choice> {
    return this.choiceService.getChoice(id);
  }

  @Mutation(() => Choice)
  async createChoice(@Args('input') input: CreateChoiceInput): Promise<Choice> {
    return this.choiceService.createChoice(input);
  }

  @Mutation(() => Choice)
  async updateChoice(@Args('input') input: UpdateChoiceInput): Promise<Choice> {
    return this.choiceService.updateChoice(input);
  }

  @Mutation(() => Boolean)
  async deleteChoice(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.choiceService.deleteChoice(id);
  }
}
