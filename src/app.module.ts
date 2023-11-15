import { Module } from '@nestjs/common';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { SurveyModule } from './survey/survey.module';
import { QuestionModule } from './question/question.module';
import { ChoiceModule } from './choice/choice.module';
import { AnswerModule } from './answer/answer.module';
import { Survey } from './survey/survey.entity';
import { Question } from './question/question.entity';
import { Choice } from './choice/choice.entity';
import { Answer } from './answer/answer.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.USER__DB__HOST,
      port: +process.env.USER__DB__PORT,
      username: process.env.USER__ID,
      password: process.env.USER__PASSWORD,
      database: process.env.USER__DATABASE,
      entities: [Survey, Question, Choice, Answer],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
    }),
    SurveyModule,
    QuestionModule,
    ChoiceModule,
    AnswerModule,
  ],
})
export class AppModule {}
