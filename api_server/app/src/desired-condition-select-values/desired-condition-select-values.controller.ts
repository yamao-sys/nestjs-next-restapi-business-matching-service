import { Controller, Get } from '@nestjs/common';
import { DesiredConditionSelectValuesService } from './desired-condition-select-values.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { DesiredConditionSelectValueDto } from './dto/profile-select-value.dto';

@Controller('desiredConditionSelectValues')
export class DesiredConditionSelectValuesController {
  constructor(
    private readonly desiredConditionSelectValuesService: DesiredConditionSelectValuesService,
  ) {}

  @Get()
  @ApiCreatedResponse({
    type: DesiredConditionSelectValueDto,
    description: '希望条件編集のセレクトボックスのオプション取得',
  })
  fetch() {
    return this.desiredConditionSelectValuesService.fetch();
  }
}
