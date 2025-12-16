import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TemperatureSensor } from './entities/temperature-sensor.entity';
import { CreateTemperatureSensorDto } from './dto/create-temperature-sensor.dto';
import { UpdateTemperatureSensorDto } from './dto/update-temperature-sensor.dto';

@Injectable()
export class TemperatureSensorsService {
  constructor(
    @InjectRepository(TemperatureSensor)
    private readonly sensorsRepository: Repository<TemperatureSensor>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createSensorDto: CreateTemperatureSensorDto): Promise<TemperatureSensor> {
    const sensor = this.sensorsRepository.create({
      ...createSensorDto,
      timestamp: new Date(),
    });
    const savedSensor = await this.sensorsRepository.save(sensor);
    this.eventEmitter.emit('temperature.created', savedSensor);
    return savedSensor;
  }

  async findAll(): Promise<TemperatureSensor[]> {
    return this.sensorsRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: 50,
    });
  }

  async findOne(id: string): Promise<TemperatureSensor> {
    const sensor = await this.sensorsRepository.findOneBy({ id });
    if (!sensor) {
      throw new NotFoundException(`Sensor with id ${id} not found`);
    }
    return sensor;
  }

  async update(id: string, updateSensorDto: UpdateTemperatureSensorDto): Promise<TemperatureSensor> {
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
