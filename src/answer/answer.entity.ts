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

  @Field(() => Choice)
  @ManyToOne(() => Choice, (choice) => choice.answers)
  choice: Choice;

  @Field(() => Int)
  @Column({ nullable: true })
  totalScore: number;

  @Field(() => Question)
  @ManyToOne(() => Question, (question) => question.answers, { nullable: true })
  question: Question;

  @Field(() => Survey)
  @ManyToOne(() => Survey, { nullable: true })
  survey: Survey;
}
