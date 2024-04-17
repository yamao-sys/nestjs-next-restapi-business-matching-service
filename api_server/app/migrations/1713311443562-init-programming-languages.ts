import { MigrationInterface, QueryRunner } from "typeorm";

export class InitProgrammingLanguages1713311443562 implements MigrationInterface {
    name = 'InitProgrammingLanguages1713311443562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`programming_languages\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`experienced_programming_languages\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`engineer_id\` bigint NOT NULL, \`experienced_duration\` enum ('lessThanOneYear', 'junior', 'middle', 'senior', 'expert') NOT NULL DEFAULT 'lessThanOneYear', \`programming_language_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`experienced_programming_languages\` ADD CONSTRAINT \`FK_deb45140257ebc8daaf6e5d6be8\` FOREIGN KEY (\`engineer_id\`) REFERENCES \`engineers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`experienced_programming_languages\` ADD CONSTRAINT \`FK_f67df522a400d92a8b32e713e2d\` FOREIGN KEY (\`programming_language_id\`) REFERENCES \`programming_languages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`experienced_programming_languages\` DROP FOREIGN KEY \`FK_f67df522a400d92a8b32e713e2d\``);
        await queryRunner.query(`ALTER TABLE \`experienced_programming_languages\` DROP FOREIGN KEY \`FK_deb45140257ebc8daaf6e5d6be8\``);
        await queryRunner.query(`DROP TABLE \`experienced_programming_languages\``);
        await queryRunner.query(`DROP TABLE \`programming_languages\``);
    }

}
