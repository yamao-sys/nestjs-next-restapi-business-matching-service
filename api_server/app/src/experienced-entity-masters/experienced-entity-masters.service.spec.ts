import { Test, TestingModule } from '@nestjs/testing';
import { ExperiencedEntityMastersService } from './experienced-entity-masters.service';

describe('ExperiencedEntityMastersService', () => {
  let service: ExperiencedEntityMastersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExperiencedEntityMastersService],
    }).compile();

    service = module.get<ExperiencedEntityMastersService>(
      ExperiencedEntityMastersService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
