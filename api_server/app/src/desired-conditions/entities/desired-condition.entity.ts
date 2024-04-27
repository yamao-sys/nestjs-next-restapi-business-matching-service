import { DesiredPriorityCondition } from '../../desired-priority-conditions/entities/desired-priority-condition.entity';
import { Engineer } from '../../engineers/entities/engineer.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum JobSeekingStatus {
  NOT_SEEKING = 'notSeeking',
  SEEKING = 'seeking',
}

export enum ExpectedStartTimings {
  IMMEDIATELY = 'immediately',
  WITHIN_MONTH = 'withinMonth',
  WITHIN_NEXT_MONTH = 'withinNextMonth',
  WITHIN_TWO_MONTH = 'withinTwoMonths',
  WITHIN_THREE_MONTH = 'withinThreeMonths',
  WITHIN_FOUR_MONTH = 'withinFourMonths',
  WITHIN_FIVE_MONTH = 'withinFiveMonths',
  WITHIN_SIX_MONTH = 'withinSixMonths',
  ANYTIME = 'anytime',
}

export enum WorkingTimes {
  ONE_DAY_TO_A_WEEK = 'oneDayToAWeek',
  TWO_DAYS_TO_A_WEEK = 'twoDaysToAWeek',
  THREE_DAYS_TO_A_WEEK = 'threeDaysToAWeek',
  FOUR_DAYS_TO_A_WEEK = 'fourDaysToAWeek',
  FIVE_DAYS_TO_A_WEEK = 'fiveDaysToAWeek',
}

export enum WorkingTimeZones {
  DAYTIME_WORKDAY = 'daytimeWorkday',
  MORNING_NIGHT_WORKDAY_OR_HOLIDAY = 'morningNightWorkdayOrHoliday',
  ANYTIME = 'anytime',
}

export enum RemortWork {
  NO_DETAILED = 'noDetailed',
  OFFICE = 'office',
  PART_REMORT = 'partRemort',
  REMORT_MAIN = 'remortMain',
  FULL_REMORT = 'fullRemort',
}

@Entity('desired_conditions')
export class DesiredCondition extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ type: 'bigint', name: 'engineer_id' })
  engineerId!: string;

  @OneToOne(() => Engineer, (engineer) => engineer.desiredCondition, {
    createForeignKeyConstraints: true,
    persistence: false,
  })
  @JoinColumn({
    name: 'engineer_id',
    referencedColumnName: 'id',
  })
  readonly engineer?: Engineer;

  @Column({
    type: 'enum',
    name: 'job_seeking_status',
    enum: JobSeekingStatus,
    default: JobSeekingStatus.NOT_SEEKING,
  })
  jobSeekingStatus!: JobSeekingStatus;

  @Column({
    type: 'enum',
    name: 'expected_start_timing',
    enum: ExpectedStartTimings,
    default: ExpectedStartTimings.WITHIN_MONTH,
  })
  expectedStartTimings!: ExpectedStartTimings;

  @Column({
    type: 'enum',
    name: 'min_working_time',
    enum: WorkingTimes,
    default: WorkingTimes.FIVE_DAYS_TO_A_WEEK,
  })
  minWorkingTimes!: WorkingTimes;

  @Column({
    type: 'enum',
    name: 'max_working_time',
    enum: WorkingTimes,
    default: WorkingTimes.FIVE_DAYS_TO_A_WEEK,
  })
  maxWorkingTimes!: WorkingTimes;

  @Column({
    type: 'enum',
    name: 'working_time_zone',
    enum: WorkingTimeZones,
    default: WorkingTimeZones.DAYTIME_WORKDAY,
  })
  workingTimeZone!: WorkingTimeZones;

  @Column({
    type: 'enum',
    name: 'remort_work',
    enum: RemortWork,
    default: RemortWork.NO_DETAILED,
  })
  remortWork!: RemortWork;

  @Column({
    type: 'text',
    nullable: true,
  })
  remarks!: string;

  @OneToMany(
    () => DesiredPriorityCondition,
    (desiredPriorityConditions) => desiredPriorityConditions.desiredCondition,
    {
      cascade: true, // desiredConditionの保存時に一緒に保存する
    },
  )
  desiredPriorityConditions?: DesiredPriorityCondition[];

  constructor(engineerId?: string) {
    super();

    if (engineerId) {
      this.engineerId = engineerId;
    }
    this.jobSeekingStatus = JobSeekingStatus.NOT_SEEKING;
    this.expectedStartTimings = ExpectedStartTimings.WITHIN_MONTH;
    this.minWorkingTimes = WorkingTimes.FIVE_DAYS_TO_A_WEEK;
    this.maxWorkingTimes = WorkingTimes.FIVE_DAYS_TO_A_WEEK;
    this.workingTimeZone = WorkingTimeZones.DAYTIME_WORKDAY;
    this.remortWork = RemortWork.NO_DETAILED;
    this.remarks = '';
  }
}
