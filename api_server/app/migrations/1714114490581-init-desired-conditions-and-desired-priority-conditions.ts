import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDesiredConditionsAndDesiredPriorityConditions1714114490581
  implements MigrationInterface
{
  name = 'InitDesiredConditionsAndDesiredPriorityConditions1714114490581';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`desired_priority_conditions\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`desired_condition_id\` bigint NOT NULL, \`priority\` int NOT NULL, \`condition\` enum ('revenue', 'remort', 'working_date', 'industry', 'skill', 'experience', 'want_to_acquire_skill', 'company_scale') NOT NULL DEFAULT 'revenue', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`desired_conditions\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`engineer_id\` bigint NOT NULL, \`job_seeking_status\` enum ('not_seeking', 'seeking') NOT NULL DEFAULT 'not_seeking', \`expected_start_timing\` enum ('immediately', 'within_month', 'within_next_month', 'within_two_months', 'within_three_months', 'within_four_months', 'within_five_months', 'within_six_months', 'anytime') NOT NULL DEFAULT 'within_month', \`min_working_time\` enum ('one_day_to_a_week', 'two_days_to_a_week', 'three_days_to_a_week', 'four_days_to_a_week', 'five_days_to_a_week') NOT NULL DEFAULT 'five_days_to_a_week', \`max_working_time\` enum ('one_day_to_a_week', 'two_days_to_a_week', 'three_days_to_a_week', 'four_days_to_a_week', 'five_days_to_a_week') NOT NULL DEFAULT 'five_days_to_a_week', \`working_time_zone\` enum ('daytime_workday', 'morning_night_workday_or_holiday', 'anytime') NOT NULL DEFAULT 'daytime_workday', \`remort_work\` enum ('no_detailed', 'office', 'part_remort', 'remort_main', 'full_remort') NOT NULL DEFAULT 'no_detailed', \`remarks\` text NULL, UNIQUE INDEX \`REL_0f5d395fcd1f77670149ede495\` (\`engineer_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`desired_priority_conditions\` ADD CONSTRAINT \`FK_645c74a04df0f19b7d89935f2c4\` FOREIGN KEY (\`desired_condition_id\`) REFERENCES \`desired_conditions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`desired_conditions\` ADD CONSTRAINT \`FK_0f5d395fcd1f77670149ede495f\` FOREIGN KEY (\`engineer_id\`) REFERENCES \`engineers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`desired_conditions\` DROP FOREIGN KEY \`FK_0f5d395fcd1f77670149ede495f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`desired_priority_conditions\` DROP FOREIGN KEY \`FK_645c74a04df0f19b7d89935f2c4\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_0f5d395fcd1f77670149ede495\` ON \`desired_conditions\``,
    );
    await queryRunner.query(`DROP TABLE \`desired_conditions\``);
    await queryRunner.query(`DROP TABLE \`desired_priority_conditions\``);
  }
}
