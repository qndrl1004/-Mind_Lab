import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { Question } from './question.entity';
import { QuestionInput } from './question.input';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Query(() => [Question])
  async getQuestions(): Promise<Question[]> {
    try {
      return await this.questionService.getQuestions();
    } catch (error) {
      throw new Error(`Failed to fetch questions: ${error.message}`);
    }
  }

  @Query(() => Question)
  async getQuestion(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Question> {
    try {
      return await this.questionService.getQuestion(id);
    } catch (error) {
      throw new Error(`Failed to fetch question: ${error.message}`);
    }
  }

  @Mutation(() => Question)
  async createQuestion(@Args('input') input: QuestionInput): Promise<Question> {
    try {
      return await this.questionService.createQuestion(input);
    } catch (error) {
      throw new Error(`Failed to create question: ${error.message}`);
    }
  }

  @Mutation(() => Question)
  async updateQuestion(@Args('input') input: QuestionInput): Promise<Question> {
    try {
      return await this.questionService.updateQuestion(input);
    } catch (error) {
      throw new Error(`Failed to update question: ${error.message}`);
    }
  }

  @Mutation(() => Boolean)
  async deleteQuestion(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    try {
      return await this.questionService.deleteQuestion(id);
    } catch (error) {
      throw new Error(`Failed to delete question: ${error.message}`);
    }
  }
}
