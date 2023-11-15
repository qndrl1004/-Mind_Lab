import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Choice } from './choice.entity';
import { ChoiceService } from './choice.service';
import { ChoiceResolver } from './choice.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Choice])],
  providers: [ChoiceService, ChoiceResolver],
})
export class ChoiceModule {}
