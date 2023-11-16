import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Choice } from '../choice/choice.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { Question } from '../question/question.entity';

@Entity()
@ObjectType()
export class Answer {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Choice, (choice) => choice.answers)
  @JoinColumn({ name: 'choiceId' })
  choice: Choice;

  @Field(() => Int)
  @Column()
  totalScore: number;

  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn({ name: 'questionId' })
  question: Question;

  @Column()
  surveyId: number;
}
