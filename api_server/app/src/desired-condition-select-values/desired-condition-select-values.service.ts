import { Injectable } from '@nestjs/common';
import {
  ExpectedStartTimingsDisplayValues,
  JobSeekingStatusDisplayValues,
  RemortWorkDisplayValues,
  WorkingTimeZonesDisplayValues,
  WorkingTimesDisplayValues,
} from 'src/desired-conditions/enums';
import { PriorityConditionDisplayValues } from 'src/desired-priority-conditions/enums';

@Injectable()
export class DesiredConditionSelectValuesService {
  fetch() {
    return {
      jobSeekingStatus: JobSeekingStatusDisplayValues,
      expectedStartTimings: ExpectedStartTimingsDisplayValues,
      workingTimes: WorkingTimesDisplayValues,
      workingTimeZone: WorkingTimeZonesDisplayValues,
      remortWork: RemortWorkDisplayValues,
      desiredPriorityCondition: PriorityConditionDisplayValues,
    };
  }
}
