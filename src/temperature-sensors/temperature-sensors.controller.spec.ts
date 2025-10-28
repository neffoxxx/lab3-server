import { Test, TestingModule } from '@nestjs/testing';
import { TemperatureSensorsController } from './temperature-sensors.controller';
import { TemperatureSensorsService } from './temperature-sensors.service';

describe('TemperatureSensorsController', () => {
  let controller: TemperatureSensorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemperatureSensorsController],
      providers: [TemperatureSensorsService],
    }).compile();

    controller = module.get<TemperatureSensorsController>(TemperatureSensorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
