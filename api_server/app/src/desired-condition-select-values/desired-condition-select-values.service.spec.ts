import { Test, TestingModule } from '@nestjs/testing';
import { DesiredConditionSelectValuesService } from './desired-condition-select-values.service';

describe('DesiredConditionSelectValuesService', () => {
  let service: DesiredConditionSelectValuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesiredConditionSelectValuesService],
    }).compile();

    service = module.get<DesiredConditionSelectValuesService>(DesiredConditionSelectValuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
