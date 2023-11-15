import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Choice } from '../choice/choice.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

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
  @OneToMany(() => Choice, (choice) => choice.question)
  choices: Choice[];
}
