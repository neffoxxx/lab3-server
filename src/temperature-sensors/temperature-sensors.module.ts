import { Module } from '@nestjs/common';
import { TemperatureSensorsService } from './temperature-sensors.service';
import { TemperatureSensorsController } from './temperature-sensors.controller';
@Module({
 controllers: [TemperatureSensorsController],
 providers: [TemperatureSensorsService],
})
export class TemperatureSensorsModule {} 