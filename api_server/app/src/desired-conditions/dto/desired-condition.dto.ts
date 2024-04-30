import { DesiredPriorityCondition } from '../../desired-priority-conditions/entities/desired-priority-condition.entity';
import {
  ExpectedStartTimings,
  JobSeekingStatus,
  RemortWork,
  WorkingTimeZones,
  WorkingTimes,
} from '../enums';

export class DesiredConditionDto {
  jobSeekingStatus: JobSeekingStatus;
  expectedStartTimings: ExpectedStartTimings;
  minWorkingTimes: WorkingTimes;
  maxWorkingTimes: WorkingTimes;
  workingTimeZone: WorkingTimeZones;
  remortWork: RemortWork;
  remarks: string;
  desiredPriorityConditions: Pick<
    DesiredPriorityCondition,
    'priority' | 'condition'
  >[];
}
