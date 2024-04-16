import { ExperiencedProfession } from 'src/experiences/entities/professions.entity';
import {
  CurrentEmployment,
  ExperiencedDuration,
} from '../../engineers/entities/engineer.entity';

export class UpdateProfileDto {
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
}
