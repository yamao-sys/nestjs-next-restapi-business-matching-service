import { Test, TestingModule } from '@nestjs/testing';
import { DesiredConditionsService } from './desired-conditions.service';

describe('DesiredConditionsService', () => {
  let service: DesiredConditionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesiredConditionsService],
    }).compile();

    service = module.get<DesiredConditionsService>(DesiredConditionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
