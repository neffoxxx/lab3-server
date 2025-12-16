import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { HumiditySensor } from './entities/humidity-sensor.entity';
import { CreateHumiditySensorDto } from './dto/create-humidity-sensor.dto';
import { UpdateHumiditySensorDto } from './dto/update-humidity-sensor.dto';

@Injectable()
export class HumiditySensorsService {
  constructor(
    @InjectRepository(HumiditySensor)
    private readonly sensorsRepository: Repository<HumiditySensor>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createSensorDto: CreateHumiditySensorDto): Promise<HumiditySensor> {
    const sensor = this.sensorsRepository.create({
      ...createSensorDto,
      timestamp: new Date(),
    });
    const savedSensor = await this.sensorsRepository.save(sensor);
    this.eventEmitter.emit('humidity.created', savedSensor);
    return savedSensor;
  }

  async findAll(): Promise<HumiditySensor[]> {
    return this.sensorsRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: 50,
    });
  }

  async findOne(id: string): Promise<HumiditySensor> {
    const sensor = await this.sensorsRepository.findOneBy({ id });
    if (!sensor) {
      throw new NotFoundException(`Sensor with id ${id} not found`);
    }
    return sensor;
  }

  async update(id: string, updateSensorDto: UpdateHumiditySensorDto): Promise<HumiditySensor> {
    const sensor = await this.findOne(id);
    Object.assign(sensor, updateSensorDto);
    return this.sensorsRepository.save(sensor);
  }

  async remove(id: string): Promise<void> {
    const result = await this.sensorsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Sensor with id ${id} not found`);
    }
  }
}
