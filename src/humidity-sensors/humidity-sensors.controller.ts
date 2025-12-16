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
import { HumiditySensorsService } from './humidity-sensors.service';
import { CreateHumiditySensorDto } from './dto/create-humidity-sensor.dto';
import { UpdateHumiditySensorDto } from './dto/update-humidity-sensor.dto';
import { HumiditySensor } from './entities/humidity-sensor.entity';

@Controller('humidity-sensors')
export class HumiditySensorsController {
  constructor(
    private readonly humiditySensorsService: HumiditySensorsService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, 'humidity.created').pipe(
      map((data: HumiditySensor) => {
        const isCritical = data.value < 30 || data.value > 70;
        return {
          data: {
            ...data,
            type: 'humidity',
            isCritical,
            alertMessage: isCritical
              ? `Critical humidity, Unit ${data.unit}, ${data.value}`
              : null,
          },
        } as MessageEvent;
      }),
    );
  }

  @Post()
  create(@Body() createSensorDto: CreateHumiditySensorDto) {
    return this.humiditySensorsService.create(createSensorDto);
  }

  @Get()
  findAll() {
    return this.humiditySensorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.humiditySensorsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSensorDto: UpdateHumiditySensorDto,
  ) {
    return this.humiditySensorsService.update(id, updateSensorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.humiditySensorsService.remove(id);
  }
}
