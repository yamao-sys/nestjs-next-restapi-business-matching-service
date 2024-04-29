import { Injectable } from '@nestjs/common';
import {
  CurrentEmploymentDisplayValues,
  ExperiencedDurationDisplayValues,
} from '../engineers/enums';
import { ExperiencedDurationDisplayValues as ExperiencedEntityDurationDisplayValues } from '../experiences/enums';

@Injectable()
export class ProfileSelectValuesService {
  fetch() {
    return {
      currentEmployment: CurrentEmploymentDisplayValues,
      experiencedDuration: ExperiencedDurationDisplayValues,
      experiencedEntityDuration: ExperiencedEntityDurationDisplayValues,
    };
  }
}
