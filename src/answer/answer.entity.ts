import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Question } from '../question/question.entity';
import { Choice } from '../choice/choice.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Answer {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Question)
  @ManyToOne(() => Question, { onDelete: 'CASCADE' })
  question: Question;

  @Field(() => Choice)
  @ManyToOne(() => Choice, { onDelete: 'CASCADE' })
  choice: Choice;

  @Field(() => Int)
  @Column()
  score: number;
}
