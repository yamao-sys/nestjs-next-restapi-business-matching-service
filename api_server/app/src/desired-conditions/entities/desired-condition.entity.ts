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
import {
  ExpectedStartTimings,
  JobSeekingStatus,
  RemortWork,
  WorkingTimeZones,
  WorkingTimes,
} from '../enums';

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
    default: ExpectedStartTimings.NOT_SETTED,
  })
  expectedStartTimings: ExpectedStartTimings;

  @Column({
    type: 'enum',
    name: 'min_working_time',
    enum: WorkingTimes,
    default: WorkingTimes.NOT_SETTED,
  })
  minWorkingTimes: WorkingTimes;

  @Column({
    type: 'enum',
    name: 'max_working_time',
    enum: WorkingTimes,
    default: WorkingTimes.NOT_SETTED,
  })
  maxWorkingTimes: WorkingTimes;

  @Column({
    type: 'enum',
    name: 'working_time_zone',
    enum: WorkingTimeZones,
    default: WorkingTimeZones.NOT_SETTED,
  })
  workingTimeZone: WorkingTimeZones;

  @Column({
    type: 'enum',
    name: 'remort_work',
    enum: RemortWork,
    default: RemortWork.NOT_SETTED,
  })
  remortWork: RemortWork;

  @Column({
    type: 'text',
    nullable: true,
  })
  remarks: string;

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
    this.jobSeekingStatus = JobSeekingStatus.SEEKING;
    this.expectedStartTimings = ExpectedStartTimings.NOT_SETTED;
    this.minWorkingTimes = WorkingTimes.NOT_SETTED;
    this.maxWorkingTimes = WorkingTimes.NOT_SETTED;
    this.workingTimeZone = WorkingTimeZones.NOT_SETTED;
    this.remortWork = RemortWork.NOT_SETTED;
    this.remarks = '';
  }
}
