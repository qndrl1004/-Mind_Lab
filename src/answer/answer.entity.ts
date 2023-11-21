import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Choice } from '../choice/choice.entity';
import { Question } from '../question/question.entity';
import { Survey } from '../survey/survey.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

@Entity()
@ObjectType()
export class Answer {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Choice, (choice) => choice.answers)
  @Field(() => Choice)
  choice: Choice;

  @Field(() => Int)
  @Column({ nullable: true })
  totalScore: number;

  @ManyToOne(() => Question, (question) => question.answers, { nullable: true })
  @Field(() => Question)
  question: Question;

  @ManyToOne(() => Survey, { nullable: true })
  @Field(() => Survey)
  survey: Survey;
}
