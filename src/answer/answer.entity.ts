import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Choice } from '../choice/choice.entity';
import { Question } from '../question/question.entity';
import { Survey } from '../survey/survey.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Answer {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Choice, (choice) => choice.answers)
  @JoinColumn({ name: 'choiceId' })
  @Field(() => Choice)
  choice: Choice;

  @Field(() => Int)
  @Column({ nullable: true })
  totalScore: number;

  @ManyToOne(() => Question, (question) => question.answers, {
    nullable: true,
  })
  @JoinColumn({ name: 'questionId' })
  @Field(() => Question)
  question: Question;

  @ManyToOne(() => Survey, {
    nullable: true,
  })
  @JoinColumn({ name: 'surveyId' })
  @Field(() => Survey)
  survey: Survey;
}
