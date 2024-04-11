import { CurrentEmployment } from '../entities/profile.entity';

export class ProfileForEditDto {
  lastName: string;
  firstName: string;
  birthday: string;
  currentEmployment: CurrentEmployment;
  inWorkingCompanyName: string;
  tel: string;
}
