import { Engineer } from '../../engineers/entities/engineer.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseExperiencedEntity } from './base';
import { ProgrammingLanguage } from '../../programming-languages/entities/programming-languages.entity';

export enum ExperiencedDuration {
  LESS_THAN_ONE_YEAR = 'lessThanOneYear',
  JUNIOR = 'junior',
  MIDDLE = 'middle',
  SENIOR = 'senior',
  EXPERT = 'expert',
}

@Entity('experienced_programming_languages')
export class ExperiencedProgrammingLanguage extends BaseExperiencedEntity {
  @ManyToOne(
    () => Engineer,
    (engineer) => engineer.experiencedProgrammingLanguages,
    {
      createForeignKeyConstraints: true,
      persistence: false,
      orphanedRowAction: 'delete', // idがセットされていない場合はdeleteする
    },
  )
  @JoinColumn({
    name: 'engineer_id',
    referencedColumnName: 'id',
  })
  readonly engineer?: Engineer;

  @Column({ type: 'bigint', name: 'programming_language_id' })
  programmingLanguageId!: string;

  @ManyToOne(
    () => ProgrammingLanguage,
    (programmingLanguage) =>
      programmingLanguage.experiencedProgrammingLanguages,
    {
      createForeignKeyConstraints: true,
      persistence: false,
    },
  )
  @JoinColumn({
    name: 'programming_language_id',
    referencedColumnName: 'id',
  })
  readonly programmingLanguage?: ProgrammingLanguage;
}
