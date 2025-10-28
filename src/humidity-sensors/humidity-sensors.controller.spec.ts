import { Test, TestingModule } from '@nestjs/testing';
import { HumiditySensorsController } from './humidity-sensors.controller';
import { HumiditySensorsService } from './humidity-sensors.service';

describe('HumiditySensorsController', () => {
  let controller: HumiditySensorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HumiditySensorsController],
      providers: [HumiditySensorsService],
    }).compile();

    controller = module.get<HumiditySensorsController>(HumiditySensorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
