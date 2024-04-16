import { Controller, Get } from '@nestjs/common';
import { ExperiencedEntityMastersService } from './experienced-entity-masters.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { FetchExperiencedEntityMasterResponse } from './dto/fetch-experienced-entity-master-response.dto';

@Controller('experiencedEntityMasters')
export class ExperiencedEntityMastersController {
  constructor(
    private readonly experiencedEntityMastersService: ExperiencedEntityMastersService,
  ) {}

  @Get()
  @ApiCreatedResponse({
    type: FetchExperiencedEntityMasterResponse,
    description: '経験スキルのマスタの取得',
  })
  async findAll() {
    return await this.experiencedEntityMastersService.findAll();
  }
}
