import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Choice } from '../choice/choice.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @OneToMany(() => Choice, (choice) => choice.question)
  choices: Choice[];
}
