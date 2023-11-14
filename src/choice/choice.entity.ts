import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Question } from '../question/question.entity';

@Entity()
export class Choice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Question, (question) => question.choices)
  @JoinColumn({ name: 'questionId' })
  question: Question;

  @Column({ name: 'question_id' })
  questionId: number;
}
