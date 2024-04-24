import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Engineer } from '../../engineers/entities/engineer.entity';

@Entity('skillsheets')
export class SkillSheet extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ type: 'bigint', name: 'engineer_id' })
  engineerId!: string;

  @OneToOne(() => Engineer, (engineer) => engineer.skillsheet, {
    createForeignKeyConstraints: true,
    persistence: false,
  })
  @JoinColumn({
    name: 'engineer_id',
    referencedColumnName: 'id',
  })
  readonly engineer?: Engineer;

  @Column({ name: 'file_name' })
  fileName!: string;

  @Column({ name: 'file_path' })
  filePath!: string;
}
