import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class QuestionInput {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  @Field(() => Int, { nullable: true })
  surveyId: number;
}
