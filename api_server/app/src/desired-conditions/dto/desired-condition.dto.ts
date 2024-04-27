import {
  ExpectedStartTimings,
  JobSeekingStatus,
  RemortWork,
  WorkingTimeZones,
  WorkingTimes,
} from '../entities/desired-condition.entity';
import { DesiredPriorityCondition } from '../../desired-priority-conditions/entities/desired-priority-condition.entity';

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
