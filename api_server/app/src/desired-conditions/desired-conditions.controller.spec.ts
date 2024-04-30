import { Test, TestingModule } from '@nestjs/testing';
import { DesiredConditionsController } from './desired-conditions.controller';
import { DesiredConditionsService } from './desired-conditions.service';

describe('DesiredConditionsController', () => {
  let controller: DesiredConditionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesiredConditionsController],
      providers: [DesiredConditionsService],
    }).compile();

    controller = module.get<DesiredConditionsController>(
      DesiredConditionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
