import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ChoiceService } from './choice.service';
import { Choice } from './choice.entity';

@Controller('choice')
export class ChoiceController {
  constructor(private readonly choiceService: ChoiceService) {}

  @Post()
  createChoice(
    @Body() choiceData: { content: string; questionId: number },
  ): Promise<Choice> {
    return this.choiceService.createChoice(
      choiceData.content,
      choiceData.questionId,
    );
  }

  @Get()
  findAllChoices(): Promise<Choice[]> {
    return this.choiceService.findAllChoices();
  }

  @Get(':id')
  findChoiceById(@Param('id') id: string): Promise<Choice | undefined> {
    return this.choiceService.findChoiceById(+id);
  }

  @Put(':id')
  updateChoice(
    @Param('id') id: string,
    @Body() choiceData: { content: string },
  ): Promise<Choice | undefined> {
    return this.choiceService.updateChoice(+id, choiceData.content);
  }

  @Delete(':id')
  deleteChoice(@Param('id') id: string): Promise<void> {
    return this.choiceService.deleteChoice(+id);
  }
}
