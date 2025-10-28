import { Test, TestingModule } from '@nestjs/testing';
import { HumiditySensorsService } from './humidity-sensors.service';

describe('HumiditySensorsService', () => {
  let service: HumiditySensorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HumiditySensorsService],
    }).compile();

    service = module.get<HumiditySensorsService>(HumiditySensorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
