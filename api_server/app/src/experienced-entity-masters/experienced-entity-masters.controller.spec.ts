import { Test, TestingModule } from '@nestjs/testing';
import { ExperiencedEntityMastersController } from './experienced-entity-masters.controller';
import { ExperiencedEntityMastersService } from './experienced-entity-masters.service';

describe('ExperiencedEntityMastersController', () => {
  let controller: ExperiencedEntityMastersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExperiencedEntityMastersController],
      providers: [ExperiencedEntityMastersService],
    }).compile();

    controller = module.get<ExperiencedEntityMastersController>(
      ExperiencedEntityMastersController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
