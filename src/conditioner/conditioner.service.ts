import { Injectable } from '@nestjs/common';
import { EngineService } from '../engine/engine.service';


@Injectable()
export class ConditionerService {
    constructor(private readonly engineService:EngineService) {  }
    conditionerOn():string{
         return `${this.engineService.startEngine()} the conditioner has being started`
    }
}
