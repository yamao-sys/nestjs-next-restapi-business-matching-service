import { Test, TestingModule } from '@nestjs/testing';
import { DesiredConditionSelectValuesController } from './desired-condition-select-values.controller';
import { DesiredConditionSelectValuesService } from './desired-condition-select-values.service';

describe('DesiredConditionSelectValuesController', () => {
  let controller: DesiredConditionSelectValuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesiredConditionSelectValuesController],
      providers: [DesiredConditionSelectValuesService],
    }).compile();

    controller = module.get<DesiredConditionSelectValuesController>(DesiredConditionSelectValuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
