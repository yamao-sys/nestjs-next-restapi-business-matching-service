import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExperiencedProgrammingLanguage } from '../../experiences/entities/programming-languages.entity';

@Entity('programming_languages')
export class ProgrammingLanguage extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column()
  name!: string;

  @OneToMany(
    () => ExperiencedProgrammingLanguage,
    (experiencedProgrammingLanguages) =>
      experiencedProgrammingLanguages.programmingLanguage,
  )
  experiencedProgrammingLanguages?: ExperiencedProgrammingLanguage[];
}
