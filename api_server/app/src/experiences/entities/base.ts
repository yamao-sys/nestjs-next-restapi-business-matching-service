import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ExperiencedDuration {
  LESS_THAN_ONE_YEAR = 'lessThanOneYear',
  JUNIOR = 'junior',
  MIDDLE = 'middle',
  SENIOR = 'senior',
  EXPERT = 'expert',
}

@Entity()
export class BaseExperiencedEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ type: 'bigint', name: 'engineer_id' })
  engineerId!: string;

  @Column({
    name: 'experienced_duration',
    type: 'enum',
    enum: ExperiencedDuration,
    default: ExperiencedDuration.LESS_THAN_ONE_YEAR,
  })
  experiencedDuration!: ExperiencedDuration;
}
