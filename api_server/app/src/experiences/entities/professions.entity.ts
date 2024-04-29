import { Engineer } from '../../engineers/entities/engineer.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseExperiencedEntity } from './base';
import { Profession } from '../../professions/entities/profession.entity';

@Entity('experienced_professions')
export class ExperiencedProfession extends BaseExperiencedEntity {
  @ManyToOne(() => Engineer, (engineer) => engineer.experiencedProfessions, {
    createForeignKeyConstraints: true,
    persistence: false,
    orphanedRowAction: 'delete', // idがセットされていない場合はdeleteする
  })
  @JoinColumn({
    name: 'engineer_id',
    referencedColumnName: 'id',
  })
  readonly engineer?: Engineer;

  @Column({ type: 'bigint', name: 'profession_id' })
  professionId!: string;

  @ManyToOne(
    () => Profession,
    (profession) => profession.experiencedProfessions,
    {
      createForeignKeyConstraints: true,
      persistence: false,
    },
  )
  @JoinColumn({
    name: 'profession_id',
    referencedColumnName: 'id',
  })
  readonly profession?: Profession;
}
