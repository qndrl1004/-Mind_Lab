import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  InputType,
  Field,
} from '@nestjs/graphql';
import { SurveyService } from './survey.service';
import { Survey } from './survey.entity';

@InputType()
export class SurveyInput {
  @Field()
  title: string;

  @Field()
  description: string;
}

@Resolver(() => Survey)
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService) {}

  @Query(() => [Survey])
  async getSurveys(): Promise<Survey[]> {
    return this.surveyService.getSurveys();
  }

  @Query(() => Survey)
  async getSurvey(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Survey> {
    return this.surveyService.getSurvey(id);
  }

  @Mutation(() => Survey)
  async createSurvey(@Args('input') input: SurveyInput): Promise<Survey> {
    return this.surveyService.createSurvey(input);
  }

  @Mutation(() => Survey)
  async updateSurvey(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: SurveyInput,
  ): Promise<Survey> {
    return this.surveyService.updateSurvey(id, input);
  }

  @Mutation(() => Boolean)
  async deleteSurvey(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.surveyService.deleteSurvey(id);
  }
}
