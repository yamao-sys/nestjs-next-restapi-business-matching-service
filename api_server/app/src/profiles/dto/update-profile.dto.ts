import { CurrentEmployment } from '../entities/profile.entity';

export class UpdateProfileDto {
  lastName!: string;
  firstName!: string;
  birthday!: string;
  currentEmployment!: CurrentEmployment;
  inWorkingCompanyName!: string;
  tel!: string;
}
