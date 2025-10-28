import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HumiditySensorsService } from './humidity-sensors.service';
import { CreateHumiditySensorDto } from './dto/create-humidity-sensor.dto';
import { UpdateHumiditySensorDto } from './dto/update-humidity-sensor.dto';

@Controller('humidity-sensors')
export class HumiditySensorsController {
  constructor(private readonly humiditySensorsService: HumiditySensorsService) {}

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
