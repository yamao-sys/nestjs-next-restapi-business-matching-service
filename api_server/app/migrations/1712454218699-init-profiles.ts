import { MigrationInterface, QueryRunner } from "typeorm";

export class InitProfiles1712454218699 implements MigrationInterface {
    name = 'InitProfiles1712454218699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`profiles\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`user_id\` bigint NOT NULL, \`last_name\` varchar(255) NOT NULL, \`first_name\` varchar(255) NOT NULL, \`birthday\` date NOT NULL, \`current_employment\` enum ('fleelance', 'fulltime', 'other') NOT NULL DEFAULT 'fleelance', \`in_working_company_name\` varchar(255) NOT NULL, \`tel\` varchar(255) NOT NULL, UNIQUE INDEX \`REL_9e432b7df0d182f8d292902d1a\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_9e432b7df0d182f8d292902d1a2\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_9e432b7df0d182f8d292902d1a2\``);
        await queryRunner.query(`DROP INDEX \`REL_9e432b7df0d182f8d292902d1a\` ON \`profiles\``);
        await queryRunner.query(`DROP TABLE \`profiles\``);
    }

}
