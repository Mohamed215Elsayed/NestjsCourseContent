import { Injectable } from '@nestjs/common';
import { BatteryService } from '../battery/battery.service';

@Injectable()
export class EngineService {
    constructor(private readonly batteryService:BatteryService){}
    startEngine():string{
        return `${this.batteryService.powerSupply()} the enine has being started`
    }
}
