import { Injectable } from '@nestjs/common';

@Injectable()
export class BatteryService {
    powerSupply():string{
        return `battery is on , u can start the engine now!`
    }
}
