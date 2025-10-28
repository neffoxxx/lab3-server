import { Injectable, NotFoundException } from '@nestjs/common';
import { HumiditySensor } from './entities/humidity-sensor.entity';
import { CreateHumiditySensorDto } from './dto/create-humidity-sensor.dto';
import { UpdateHumiditySensorDto } from './dto/update-humidity-sensor.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class HumiditySensorsService {
  private sensors: HumiditySensor[] = [];

  create(createSensorDto: CreateHumiditySensorDto): HumiditySensor {
    const sensor: HumiditySensor = {
      ...createSensorDto,
      id: uuidv4(),
      timestamp: new Date(),
    };
    this.sensors.push(sensor);
    return sensor;
  }

  findAll(): HumiditySensor[] {
    return this.sensors;
  }

  findOne(id: string): HumiditySensor {
    const sensor = this.sensors.find((s) => s.id === id);
    if (!sensor) throw new NotFoundException(`Sensor with id ${id} not found`);
    return sensor;
  }

  update(id: string, updateSensorDto: UpdateHumiditySensorDto): HumiditySensor {
    const sensor = this.findOne(id);
    Object.assign(sensor, updateSensorDto);
    return sensor;
  }

  remove(id: string): void {
    this.sensors = this.sensors.filter((s) => s.id !== id);
  }
}
