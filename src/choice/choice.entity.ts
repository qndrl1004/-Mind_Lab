import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Question } from '../question/question.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { Answer } from '../answer/answer.entity';

@Entity()
@ObjectType()
export class Choice {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  content: string;

  @Field(() => Int)
  @Column()
  score: number;

  @Field(() => Question, { nullable: true })
  @ManyToOne(() => Question, (question) => question.choices)
  question: Question;

  @Field(() => [Answer], { nullable: true })
  @OneToMany(() => Answer, (answer) => answer.choice)
  answers: Answer[];

  @BeforeInsert()
  async setDefaultScore() {
    if (this.question && this.question.choices) {
      const choicesCount = this.question.choices.length;
      this.score = choicesCount > 0 ? choicesCount - 1 : 0;
    } else {
      this.score = 0;
    }
    if (!this.question) {
      throw new Error('Choice must have a question.');
    }
  }
}
