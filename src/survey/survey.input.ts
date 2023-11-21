import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SurveyInput {
  @Field()
  title: string;

  @Field()
  description: string;
}
