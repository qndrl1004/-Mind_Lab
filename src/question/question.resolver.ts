import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  InputType,
  Field,
} from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { Question } from './question.entity';

@InputType()
class CreateQuestionInput {
  @Field()
  content: string;

  @Field(() => Int)
  surveyId: number;
}

@InputType()
class UpdateQuestionInput {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;
}

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Query(() => [Question])
  async getQuestions(): Promise<Question[]> {
    return this.questionService.getQuestions();
  }

  @Query(() => Question)
  async getQuestion(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Question> {
    return this.questionService.getQuestion(id);
  }

  @Mutation(() => Question)
  async createQuestion(
    @Args('input') input: CreateQuestionInput,
  ): Promise<Question> {
    return this.questionService.createQuestion(input);
  }

  @Mutation(() => Question)
  async updateQuestion(
    @Args('input') input: UpdateQuestionInput,
  ): Promise<Question> {
    return this.questionService.updateQuestion(input);
  }

  @Mutation(() => Boolean)
  async deleteQuestion(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.questionService.deleteQuestion(id);
  }
}
