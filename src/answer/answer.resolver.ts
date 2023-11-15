import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import { Answer } from './answer.entity';
import { AnswerInput } from './answer.input';

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @Query(() => Answer)
  async answer(@Args('id', { type: () => Int }) id: number): Promise<Answer> {
    return this.answerService.getAnswerById(id);
  }

  @Query(() => [Answer])
  async answers(): Promise<Answer[]> {
    return this.answerService.getAllAnswers();
  }

  @Mutation(() => Answer)
  async createAnswer(@Args('input') input: AnswerInput): Promise<Answer> {
    return this.answerService.createAnswer(
      input.questionId,
      input.choiceId,
      input.score,
    );
  }

  @Mutation(() => Boolean)
  async deleteAnswer(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.answerService.deleteAnswer(id);
  }
}
