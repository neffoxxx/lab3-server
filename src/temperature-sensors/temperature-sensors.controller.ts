  import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Sse,
  MessageEvent,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { TemperatureSensorsService } from './temperature-sensors.service';
import { CreateTemperatureSensorDto } from './dto/create-temperature-sensor.dto';
import { UpdateTemperatureSensorDto } from './dto/update-temperature-sensor.dto';
import { TemperatureSensor } from './entities/temperature-sensor.entity';

@Controller('sensors')
export class TemperatureSensorsController {
  constructor(
    private readonly sensorsService: TemperatureSensorsService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, 'temperature.created').pipe(
      map((data: TemperatureSensor) => {
        const isCritical = data.value < 12 || data.value > 55;
        return {
          data: {
            ...data,
            type: 'temperature',
            isCritical,
            alertMessage: isCritical
              ? `Critical temperature, Unit ${data.unit}, ${data.value}`
              : null,
          },
        } as MessageEvent;
      }),
    );
  }

  @Post()
  create(@Body() createSensorDto: CreateTemperatureSensorDto) {
    return this.sensorsService.create(createSensorDto);
  }

  @Get()
  findAll() {
    return this.sensorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sensorsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSensorDto: UpdateTemperatureSensorDto,
  ) {
    return this.sensorsService.update(id, updateSensorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sensorsService.remove(id);
  }
}
