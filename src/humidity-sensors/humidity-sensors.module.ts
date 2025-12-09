import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HumiditySensorsService } from './humidity-sensors.service';
import { HumiditySensorsController } from './humidity-sensors.controller';
import { HumiditySensor } from './entities/humidity-sensor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HumiditySensor])],
  controllers: [HumiditySensorsController],
  providers: [HumiditySensorsService],
})
export class HumiditySensorsModule {}
