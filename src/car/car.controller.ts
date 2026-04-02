import { Controller, Get } from '@nestjs/common';
import { ConditionerService } from '../conditioner/conditioner.service';
import { EngineService } from '../engine/engine.service';

@Controller('car')
export class CarController {
    constructor(private readonly conditionerService: ConditionerService, private readonly engineService: EngineService) { }
    @Get()
    carMove() {
        return {
            conditioner: this.conditionerService.conditionerOn(),
            engine: this.engineService.startEngine(),
        };
    }
}
