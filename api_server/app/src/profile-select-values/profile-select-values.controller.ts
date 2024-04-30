import { Controller, Get } from '@nestjs/common';
import { ProfileSelectValuesService } from './profile-select-values.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { ProfileSelectValueDto } from './dto/profile-select-value.dto';

@Controller('profileSelectValues')
export class ProfileSelectValuesController {
  constructor(
    private readonly profileSelectValuesService: ProfileSelectValuesService,
  ) {}

  @Get()
  @ApiCreatedResponse({
    type: ProfileSelectValueDto,
    description: 'プロフィール編集のセレクトボックスのオプション取得',
  })
  fetch() {
    return this.profileSelectValuesService.fetch();
  }
}
