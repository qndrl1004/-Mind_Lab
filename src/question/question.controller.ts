import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './question.entity';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  createQuestion(@Body() questionData: { content: string }): Promise<Question> {
    return this.questionService.createQuestion(questionData.content);
  }

  @Get()
  findAllQuestions(): Promise<Question[]> {
    return this.questionService.findAllQuestions();
  }

  @Get(':id')
  findQuestionById(@Param('id') id: string): Promise<Question | undefined> {
    return this.questionService.findQuestionById(+id);
  }

  @Put(':id')
  updateQuestion(
    @Param('id') id: string,
    @Body() questionData: { content: string },
  ): Promise<Question | undefined> {
    return this.questionService.updateQuestion(+id, questionData.content);
  }

  @Delete(':id')
  deleteQuestion(@Param('id') id: string): Promise<void> {
    return this.questionService.deleteQuestion(+id);
  }
}
