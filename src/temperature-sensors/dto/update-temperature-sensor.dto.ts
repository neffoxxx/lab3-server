import { PartialType } from '@nestjs/mapped-types';
import { CreateTemperatureSensorDto } from './create-temperature-sensor.dto';

export class UpdateTemperatureSensorDto extends PartialType(CreateTemperatureSensorDto) {}
