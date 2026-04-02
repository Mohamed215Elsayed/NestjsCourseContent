import { Module } from '@nestjs/common';
import { EngineService } from './engine.service';
import { BatteryModule } from '../battery/battery.module';

@Module({
  providers: [EngineService],//Provider registration
  imports: [BatteryModule],
  exports:[EngineService]
})
export class EngineModule {}
