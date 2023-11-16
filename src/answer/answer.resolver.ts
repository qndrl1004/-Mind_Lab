import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  InputType,
  Field,
} from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import { Answer } from './answer.entity';

@InputType()
class CreateOrUpdateAnswerInput {
  @Field(() => Int)
  choiceId: number;

  @Field(() => Int)
  questionId: number;

  @Field(() => Int)
  surveyId: number;
}

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @Mutation(() => Answer)
  async createOrUpdateAnswer(
    @Args('input') input: CreateOrUpdateAnswerInput,
  ): Promise<Answer> {
    const { choiceId, questionId, surveyId } = input;
    return this.answerService.createOrUpdateAnswer(
      choiceId,
      questionId,
      surveyId,
    );
  }

  @Query(() => Int)
  async getSurveyTotalScore(
    @Args('surveyId', { type: () => Int }) surveyId: number,
  ): Promise<number> {
    return this.answerService.getSurveyTotalScore(surveyId);
  }

  @Query(() => Boolean)
  async isSurveyCompleted(
    @Args('surveyId', { type: () => Int }) surveyId: number,
  ): Promise<boolean> {
    return this.answerService.isSurveyCompleted(surveyId);
  }

  @Query(() => [Answer])
  async getCompletedSurvey(
    @Args('surveyId', { type: () => Int }) surveyId: number,
  ): Promise<Answer[]> {
    return this.answerService.getCompletedSurvey(surveyId);
  }
}
