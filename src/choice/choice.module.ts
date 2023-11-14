import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Choice } from './choice.entity';
import { ChoiceService } from './choice.service';
import { ChoiceController } from './choice.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Choice])],
  providers: [ChoiceService],
  controllers: [ChoiceController],
})
export class ChoiceModule {}
