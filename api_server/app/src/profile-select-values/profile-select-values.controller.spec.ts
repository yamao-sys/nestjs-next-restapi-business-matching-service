import { Test, TestingModule } from '@nestjs/testing';
import { ProfileSelectValuesController } from './profile-select-values.controller';
import { ProfileSelectValuesService } from './profile-select-values.service';

describe('ProfileSelectValuesController', () => {
  let controller: ProfileSelectValuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileSelectValuesController],
      providers: [ProfileSelectValuesService],
    }).compile();

    controller = module.get<ProfileSelectValuesController>(ProfileSelectValuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
