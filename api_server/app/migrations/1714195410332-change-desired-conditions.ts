import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeDesiredConditions1714195410332
  implements MigrationInterface
{
  name = 'ChangeDesiredConditions1714195410332';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`desired_conditions\` CHANGE \`job_seeking_status\` \`job_seeking_status\` enum ('not_setted', 'notSeeking', 'seeking') NOT NULL DEFAULT 'notSeeking'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`desired_conditions\` CHANGE \`expected_start_timing\` \`expected_start_timing\` enum ('not_setted', 'immediately', 'withinMonth', 'withinNextMonth', 'withinTwoMonths', 'withinThreeMonths', 'withinFourMonths', 'withinFiveMonths', 'withinSixMonths', 'anytime') NOT NULL DEFAULT 'not_setted'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`desired_conditions\` CHANGE \`min_working_time\` \`min_working_time\` enum ('not_setted', 'oneDayToAWeek', 'twoDaysToAWeek', 'threeDaysToAWeek', 'fourDaysToAWeek', 'fiveDaysToAWeek') NOT NULL DEFAULT 'not_setted'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`desired_conditions\` CHANGE \`max_working_time\` \`max_working_time\` enum ('not_setted', 'oneDayToAWeek', 'twoDaysToAWeek', 'threeDaysToAWeek', 'fourDaysToAWeek', 'fiveDaysToAWeek') NOT NULL DEFAULT 'not_setted'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`desired_conditions\` CHANGE \`working_time_zone\` \`working_time_zone\` enum ('not_setted', 'daytimeWorkday', 'morningNightWorkdayOrHoliday', 'anytime') NOT NULL DEFAULT 'not_setted'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`desired_conditions\` CHANGE \`remort_work\` \`remort_work\` enum ('not_setted', 'noDetailed', 'office', 'partRemort', 'remortMain', 'fullRemort') NOT NULL DEFAULT 'not_setted'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`desired_conditions\` CHANGE \`remort_work\` \`remort_work\` enum ('no_detailed', 'office', 'part_remort', 'remort_main', 'full_remort') NOT NULL DEFAULT 'no_detailed'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`desired_conditions\` CHANGE \`working_time_zone\` \`working_time_zone\` enum ('daytime_workday', 'morning_night_workday_or_holiday', 'anytime') NOT NULL DEFAULT 'daytime_workday'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`desired_conditions\` CHANGE \`max_working_time\` \`max_working_time\` enum ('one_day_to_a_week', 'two_days_to_a_week', 'three_days_to_a_week', 'four_days_to_a_week', 'five_days_to_a_week') NOT NULL DEFAULT 'five_days_to_a_week'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`desired_conditions\` CHANGE \`min_working_time\` \`min_working_time\` enum ('one_day_to_a_week', 'two_days_to_a_week', 'three_days_to_a_week', 'four_days_to_a_week', 'five_days_to_a_week') NOT NULL DEFAULT 'five_days_to_a_week'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`desired_conditions\` CHANGE \`expected_start_timing\` \`expected_start_timing\` enum ('immediately', 'within_month', 'within_next_month', 'within_two_months', 'within_three_months', 'within_four_months', 'within_five_months', 'within_six_months', 'anytime') NOT NULL DEFAULT 'within_month'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`desired_conditions\` CHANGE \`job_seeking_status\` \`job_seeking_status\` enum ('not_seeking', 'seeking') NOT NULL DEFAULT 'not_seeking'`,
    );
  }
}
