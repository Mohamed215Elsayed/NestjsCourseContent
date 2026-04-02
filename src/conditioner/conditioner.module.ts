import { Module } from '@nestjs/common';
import { ConditionerService } from './conditioner.service';
import { EngineModule } from '../engine/engine.module';

@Module({
  providers: [ConditionerService],
  controllers: [],
  imports:[EngineModule],
  exports:[ConditionerService]
})
export class ConditionerModule {}
