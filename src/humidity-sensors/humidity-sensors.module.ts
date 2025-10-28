import { Module } from '@nestjs/common';
import { HumiditySensorsService } from './humidity-sensors.service';
import { HumiditySensorsController } from './humidity-sensors.controller';

@Module({
  controllers: [HumiditySensorsController],
  providers: [HumiditySensorsService],
})
export class HumiditySensorsModule {}
