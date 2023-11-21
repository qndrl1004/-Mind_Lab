import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChoiceService } from './choice.service';
import { Choice } from './choice.entity';
import { QuestionService } from 'src/question/question.service';
import { CreateChoiceInput, UpdateChoiceInput } from './choice.input';

@Resolver(() => Choice)
export class ChoiceResolver {
  constructor(
    private readonly choiceService: ChoiceService,
    private readonly questionService: QuestionService,
  ) {}

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
    const { content, questionId } = input;

    const choice = await this.choiceService.createChoice({
      content,
      questionId,
    });

    choice.question = await this.questionService.getQuestion(questionId);

    await this.choiceService.initializeScoresForNewQuestion(questionId);

    return choice;
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
