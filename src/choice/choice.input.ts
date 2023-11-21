import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateChoiceInput {
  @Field()
  content: string;

  @Field(() => Int)
  questionId: number;
}

@InputType()
export class UpdateChoiceInput {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;
}
