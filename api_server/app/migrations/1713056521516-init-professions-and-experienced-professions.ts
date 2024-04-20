import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitProfessionsAndExperiencedProfessions1713056521516
  implements MigrationInterface
{
  name = 'InitProfessionsAndExperiencedProfessions1713056521516';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`professions\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`experienced_professions\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`engineer_id\` bigint NOT NULL, \`experienced_duration\` enum ('lessThanOneYear', 'junior', 'middle', 'senior', 'expert') NOT NULL DEFAULT 'lessThanOneYear', \`profession_id\` bigint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`experienced_professions\` ADD CONSTRAINT \`FK_cf12159d3cf75eb668bcefbeccb\` FOREIGN KEY (\`engineer_id\`) REFERENCES \`engineers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`experienced_professions\` ADD CONSTRAINT \`FK_44d003a59c83f81b4149c483258\` FOREIGN KEY (\`profession_id\`) REFERENCES \`professions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`experienced_professions\` DROP FOREIGN KEY \`FK_44d003a59c83f81b4149c483258\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`experienced_professions\` DROP FOREIGN KEY \`FK_cf12159d3cf75eb668bcefbeccb\``,
    );
    await queryRunner.query(`DROP TABLE \`experienced_professions\``);
    await queryRunner.query(`DROP TABLE \`professions\``);
  }
}
