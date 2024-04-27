import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDesiredPriorityConditions1714195716918 implements MigrationInterface {
    name = 'ChangeDesiredPriorityConditions1714195716918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`desired_priority_conditions\` CHANGE \`condition\` \`condition\` enum ('not_setted', 'revenue', 'remort', 'working_date', 'industry', 'skill', 'experience', 'want_to_acquire_skill', 'company_scale') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`desired_priority_conditions\` CHANGE \`condition\` \`condition\` enum ('revenue', 'remort', 'working_date', 'industry', 'skill', 'experience', 'want_to_acquire_skill', 'company_scale') NOT NULL DEFAULT 'revenue'`);
    }

}
