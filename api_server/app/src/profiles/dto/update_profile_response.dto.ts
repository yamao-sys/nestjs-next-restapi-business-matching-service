import { ApiProperty } from '@nestjs/swagger';
import {
  CurrentEmployment,
  ExperiencedDuration,
} from '../../engineers/entities/engineer.entity';
import { ExperiencedProfession } from 'src/experiences/entities/professions.entity';

export class UpdateProfileResponseDto {
  lastName: string;
  firstName: string;
  birthday: string;
  currentEmployment: CurrentEmployment;
  inWorkingCompanyName: string;
  tel: string;
  latestProject: string;
  currentHourlyWage: number;
  experiencedDuration: ExperiencedDuration;
  selfPromotion: string;
  experiencedProfessions: ExperiencedProfession[];
  @ApiProperty({
    example: ['姓は必須です。'],
  })
  errors: {
    key?: string;
    messages?: [];
  }[];
}
