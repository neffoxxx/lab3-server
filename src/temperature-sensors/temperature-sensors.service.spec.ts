import { Test, TestingModule } from '@nestjs/testing';
import { TemperatureSensorsService } from './temperature-sensors.service';

describe('TemperatureSensorsService', () => {
  let service: TemperatureSensorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemperatureSensorsService],
    }).compile();

    service = module.get<TemperatureSensorsService>(TemperatureSensorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
