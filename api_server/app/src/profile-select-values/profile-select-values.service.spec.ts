import { Test, TestingModule } from '@nestjs/testing';
import { ProfileSelectValuesService } from './profile-select-values.service';

describe('ProfileSelectValuesService', () => {
  let service: ProfileSelectValuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileSelectValuesService],
    }).compile();

    service = module.get<ProfileSelectValuesService>(ProfileSelectValuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
