import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BatteryModule } from './battery/battery.module';
import { EngineModule } from './engine/engine.module';
import { CarModule } from './car/car.module';
import { ConditionerModule } from './conditioner/conditioner.module';

@Module({
  imports: [UsersModule, BatteryModule, EngineModule, CarModule, ConditionerModule], //meta module data that nestjs uses to organize the application structure
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
