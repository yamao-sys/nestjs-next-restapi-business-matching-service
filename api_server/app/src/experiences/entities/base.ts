import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ExperiencedDuration } from '../enums';

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
