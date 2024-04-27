import { DesiredCondition } from '../../desired-conditions/entities/desired-condition.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum PriorityCondition {
  NOT_SETTED = 'not_setted',
  REVENUE = 'revenue',
  REMORT = 'remort',
  WORKING_DATE = 'working_date',
  INDUSTRY = 'industry',
  SKILL = 'skill',
  EXPERIENCE = 'experience',
  WANT_TO_ACQUIRE_SKILL = 'want_to_acquire_skill',
  COMPANY_SCALE = 'company_scale',
}

@Entity('desired_priority_conditions')
export class DesiredPriorityCondition extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ type: 'bigint', name: 'desired_condition_id' })
  desiredConditionId!: string;

  @ManyToOne(
    () => DesiredCondition,
    (desiredCondition) => desiredCondition.desiredPriorityConditions,
    {
      createForeignKeyConstraints: true,
      persistence: false,
      orphanedRowAction: 'delete', // idがセットされていない場合はdeleteする
    },
  )
  @JoinColumn({
    name: 'desired_condition_id',
    referencedColumnName: 'id',
  })
  readonly desiredCondition?: DesiredCondition;

  @Column({
    type: 'int',
    name: 'priority',
  })
  priority!: number;

  @Column({
    type: 'enum',
    name: 'condition',
    enum: PriorityCondition,
  })
  condition!: PriorityCondition;
}
