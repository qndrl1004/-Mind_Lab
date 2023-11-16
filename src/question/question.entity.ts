import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Choice } from '../choice/choice.entity';
import { Survey } from '../survey/survey.entity';
import { Answer } from '../answer/answer.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Question {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  content: string;

  @Field(() => [Choice], { nullable: true })
  @OneToMany(() => Choice, (choice) => choice.question, {
    eager: true,
    cascade: true,
  })
  choices: Choice[];

  @Field(() => Survey)
  @ManyToOne(() => Survey, (survey) => survey.questions)
  survey: Survey;

  @Field(() => [Answer])
  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @BeforeInsert()
  resetScores() {
    if (this.choices) {
      this.choices.forEach((choice, index) => {
        choice.score = index;
      });
    }
  }
}
