import { CurrentEmployment, ExperiencedDuration } from 'src/engineers/enums';
import { ExperiencedProfession } from 'src/experiences/entities/professions.entity';
import { ExperiencedProgrammingLanguage } from 'src/experiences/entities/programming-languages.entity';

export class ProfileForEditDto {
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
}
