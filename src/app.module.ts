import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemperatureSensorsModule } from './temperature-sensors/temperature-sensors.module';
import { HumiditySensorsModule } from './humidity-sensors/humidity-sensors.module';

@Module({
  imports: [TemperatureSensorsModule, HumiditySensorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
