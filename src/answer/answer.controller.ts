import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { Answer } from './answer.entity';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  createAnswer(
    @Body() answerData: { questionId: number; choiceId: number; score: number },
  ): Promise<Answer> {
    const { questionId, choiceId, score } = answerData;
    return this.answerService.createAnswer(questionId, choiceId, score);
  }

  @Get()
  findAllAnswers(): Promise<Answer[]> {
    return this.answerService.findAllAnswers();
  }

  @Get(':id')
  findAnswerById(@Param('id') id: string): Promise<Answer | undefined> {
    return this.answerService.findAnswerById(+id);
  }

  @Put(':id')
  updateAnswer(
    @Param('id') id: string,
    @Body() answerData: { score: number },
  ): Promise<Answer | undefined> {
    return this.answerService.updateAnswer(+id, answerData.score);
  }

  @Delete(':id')
  deleteAnswer(@Param('id') id: string): Promise<void> {
    return this.answerService.deleteAnswer(+id);
  }
}
