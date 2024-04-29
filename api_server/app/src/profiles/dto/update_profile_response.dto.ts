import { ApiProperty } from '@nestjs/swagger';
import { CurrentEmployment, ExperiencedDuration } from 'src/engineers/enums';
import { ExperiencedProfession } from 'src/experiences/entities/professions.entity';
import { ExperiencedProgrammingLanguage } from 'src/experiences/entities/programming-languages.entity';

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
  experiencedProgrammingLanguages: ExperiencedProgrammingLanguage[];
  skillsheetName?: string;
  skillsheetData?: string;
  @ApiProperty({
    example: ['姓は必須です。'],
  })
  errors: {
    key?: string;
    messages?: [];
  }[];
}
