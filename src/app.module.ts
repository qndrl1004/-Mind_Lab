import { Module } from '@nestjs/common';
// import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyModule } from './survey/survey.module';
import { QuestionModule } from './question/question.module';
import { ChoiceModule } from './choice/choice.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [
    // GraphQLModule.forRoot({
    //   autoSchemaFile: true,
    //   driver: {
    //     type: 'apollo',
    //   },
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.USER__DB__HOST,
      port: +process.env.USER__DB__PORT,
      username: process.env.USER__ID,
      password: process.env.USER__PASSWORD,
      database: process.env.USER__DATABASE,
      synchronize: true,
    }),
    SurveyModule,
    QuestionModule,
    ChoiceModule,
    AnswerModule,
  ],
})
export class AppModule {}
