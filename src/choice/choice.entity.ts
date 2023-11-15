import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Question } from '../question/question.entity';
import { ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Choice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Question, (question) => question.choices)
  @JoinColumn({ name: 'questionId' })
  question: Question;
}
