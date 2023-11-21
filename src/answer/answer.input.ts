import { InputType, Field, Int } from '@nestjs/graphql';
@InputType()
export class CreateOrUpdateAnswerInput {
  @Field(() => Int)
  choiceId: number;

  @Field(() => Int)
  questionId: number;

  @Field(() => Int)
  surveyId: number;
}
