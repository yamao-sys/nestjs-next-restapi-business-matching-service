import { IsNotEmpty, Validate } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsTelNumber } from '../validators/is-tel-number';
import { ExperiencedProfession } from '../../experiences/entities/professions.entity';
import { ExperiencedProgrammingLanguage } from '../../experiences/entities/programming-languages.entity';
import { SkillSheet } from '../../skillsheets/entities/skillsheet.entity';
import { DesiredCondition } from '../../desired-conditions/entities/desired-condition.entity';
import { CurrentEmployment, ExperiencedDuration } from '../enums';

@Entity('engineers')
export class Engineer extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ type: 'bigint', name: 'user_id' })
  userId!: string;

  @OneToOne(() => User, (user) => user.engineer, {
    createForeignKeyConstraints: true,
    persistence: false,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  readonly user?: User;

  @IsNotEmpty({ message: '姓は必須です。' })
  @Column({ name: 'last_name' })
  lastName!: string;

  @IsNotEmpty({ message: '名は必須です。' })
  @Column({ name: 'first_name' })
  firstName!: string;

  @IsNotEmpty({ message: '生年月は必須です。' })
  @Column({ type: 'date' })
  birthday!: string;

  // 居住地はprefecturesテーブルを作ってそれと関連づける
  // @IsNotEmpty({ message: '居住地は必須です。' })
  // @Column()
  // prefecture!: string;

  @IsNotEmpty({ message: '現在の働き方は必須です。' })
  @Column({
    name: 'current_employment',
    type: 'enum',
    enum: CurrentEmployment,
    default: CurrentEmployment.FLEELANCE,
  })
  currentEmployment!: CurrentEmployment;

  @IsNotEmpty({ message: '稼働中/勤務中の会社は必須です。' })
  @Column({ name: 'in_working_company_name' })
  inWorkingCompanyName!: string;

  @IsNotEmpty({ message: '電話番号は必須です。' })
  @Validate(IsTelNumber)
  @Column()
  tel!: string;

  @Column({ name: 'latest_project' })
  latestProject!: string;

  @Column({ name: 'current_hourly_wage' })
  currentHourlyWage!: number;

  @Column({
    name: 'experienced_duration',
    type: 'enum',
    enum: ExperiencedDuration,
    default: ExperiencedDuration.LESS_THAN_ONE_YEAR,
  })
  experiencedDuration!: ExperiencedDuration;

  @Column({ name: 'self_promotion' })
  selfPromotion!: string;

  @OneToMany(
    () => ExperiencedProfession,
    (experiencedProfession) => experiencedProfession.engineer,
    {
      cascade: true, // engineerの保存時に一緒に保存する
    },
  )
  experiencedProfessions?: ExperiencedProfession[];

  @OneToMany(
    () => ExperiencedProgrammingLanguage,
    (experiencedProgrammingLanguages) =>
      experiencedProgrammingLanguages.engineer,
    {
      cascade: true, // engineerの保存時に一緒に保存する
    },
  )
  experiencedProgrammingLanguages?: ExperiencedProgrammingLanguage[];

  @OneToOne(() => SkillSheet, (skillsheet) => skillsheet.engineer, {
    cascade: true, // engineerの保存時に一緒に保存する
  })
  skillsheet?: SkillSheet;

  @OneToOne(
    () => DesiredCondition,
    (desiredCondition) => desiredCondition.engineer,
  )
  desiredCondition?: DesiredCondition;

  constructor(userId?: string) {
    super();

    if (userId) {
      this.userId = userId;
    }
    this.lastName = '';
    this.firstName = '';
    this.birthday = '';
    this.currentEmployment = CurrentEmployment.FLEELANCE;
    this.inWorkingCompanyName = '';
    this.tel = '';
    this.latestProject = '';
    this.currentHourlyWage = 0;
    this.experiencedDuration = ExperiencedDuration.LESS_THAN_ONE_YEAR;
    this.selfPromotion = '';
  }
}
