import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Question } from '../question/question.entity';

@Entity()
@ObjectType()
export class Survey {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field(() => [Question], { nullable: true })
  @OneToMany(() => Question, (question) => question.survey, { eager: true })
  questions: Question[];
}
