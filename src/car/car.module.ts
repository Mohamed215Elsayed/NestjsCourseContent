import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { ConditionerModule } from '../conditioner/conditioner.module';
import { EngineModule } from '../engine/engine.module';

@Module({
  controllers: [CarController],
  imports:[ConditionerModule,EngineModule]
})
export class CarModule {}
