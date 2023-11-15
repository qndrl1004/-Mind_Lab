import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Question } from '../question/question.entity';
import { Choice } from '../choice/choice.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, { onDelete: 'CASCADE' })
  question: Question;

  @ManyToOne(() => Choice, { onDelete: 'CASCADE' })
  choice: Choice;

  @Column()
  score: number;
}
