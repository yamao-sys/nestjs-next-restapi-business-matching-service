import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExperiencedProfession } from '../../experiences/entities/professions.entity';

@Entity('professions')
export class Profession extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column()
  name!: string;

  @OneToMany(
    () => ExperiencedProfession,
    (experiencedProfession) => experiencedProfession.profession,
  )
  experiencedProfessions?: ExperiencedProfession[];
}
