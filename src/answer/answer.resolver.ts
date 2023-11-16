import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import { Answer } from './answer.entity';
import { Survey } from '../survey/survey.entity';
import { Question } from '../question/question.entity';

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @Query(() => [Answer])
  async getAllSurveys(): Promise<Survey[]> {
    return this.answerService.getAllSurveys();
  }

  @Query(() => [Question])
  async getCompletedSurveyDetails(
    @Args('surveyId', { type: () => Int }) surveyId: number,
  ): Promise<Question> {
    return this.answerService.getCompletedSurveyDetails(surveyId);
  }

  @Mutation(() => Answer)
  async createOrUpdateAnswer(
    @Args('questionId', { type: () => Int }) questionId: number,
    @Args('choiceId', { type: () => Int }) choiceId: number,
    @Args('surveyId', { type: () => Int }) surveyId: number,
  ): Promise<Answer> {
    return this.answerService.createOrUpdateAnswer(
      questionId,
      choiceId,
      surveyId,
    );
  }

  @Query(() => Int)
  async getSurveyTotalScore(
    @Args('surveyId', { type: () => Int }) surveyId: number,
  ): Promise<number> {
    return this.answerService.getSurveyTotalScore(surveyId);
  }
}
